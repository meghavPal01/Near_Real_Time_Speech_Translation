import os
import base64
import io
import tempfile
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import torch
from deepmultilingualpunctuation import PunctuationModel
import whisper

# --- Configuration ---
# Check for available device (GPU or CPU)
device = 0 if torch.cuda.is_available() else -1
print(f"Using device: {'GPU' if device == 0 else 'CPU'}")

# --- FastAPI App Initialization ---
app = FastAPI(
    title="Real-Time Speech Translator API (NLLB + Punctuation)",
    description="An API to restore punctuation and translate text using high-quality Hugging Face models.",
    version="4.0.0",
)

# --- CORS Configuration ---
# Allow Chrome extensions and local development
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "chrome-extension://*",  # Allow all Chrome extensions
    "moz-extension://*",     # Allow Firefox extensions
    "*"  # Allow all origins (for development only)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Explicitly include OPTIONS
    allow_headers=["*"],
)

# --- Pydantic Models for Data Validation ---
class TranslationRequest(BaseModel):
    text: str
    source_language: str # e.g., "English"
    target_language: str # e.g., "Spanish"

class AudioTranscriptionRequest(BaseModel):
    audio_data: str  # Base64 encoded audio
    source_language: str
    target_language: str

# --- Model Loading and Caching ---
model_cache = {}

# NLLB uses specific language codes - Complete mapping for all supported languages
nllb_language_codes = {
    'Acehnese (Arabic)': 'ace_Arab',
    'Acehnese (Latin)': 'ace_Latn', 
    'Arabic (Mesopotamian)': 'acm_Arab',
    'Arabic (Ta\'izzi-Adeni)': 'acq_Arab',
    'Arabic (Tunisian)': 'aeb_Arab',
    'Afrikaans': 'afr_Latn',
    'Arabic (South Levantine)': 'ajp_Arab',
    'Akan': 'aka_Latn',
    'Amharic': 'amh_Ethi',
    'Arabic (North Levantine)': 'apc_Arab',
    'Arabic (Standard)': 'arb_Arab',
    'Arabic (Najdi)': 'ars_Arab',
    'Arabic (Moroccan)': 'ary_Arab',
    'Arabic (Egyptian)': 'arz_Arab',
    'Assamese': 'asm_Beng',
    'Asturian': 'ast_Latn',
    'Awadhi': 'awa_Deva',
    'Aymara': 'ayr_Latn',
    'Azerbaijani (South)': 'azb_Arab',
    'Azerbaijani (North)': 'azj_Latn',
    'Bashkir': 'bak_Cyrl',
    'Bambara': 'bam_Latn',
    'Balinese': 'ban_Latn',
    'Belarusian': 'bel_Cyrl',
    'Bemba': 'bem_Latn',
    'Bengali': 'ben_Beng',
    'Bhojpuri': 'bho_Deva',
    'Banjar (Arabic)': 'bjn_Arab',
    'Banjar (Latin)': 'bjn_Latn',
    'Tibetan': 'bod_Tibt',
    'Bosnian': 'bos_Latn',
    'Buginese': 'bug_Latn',
    'Bulgarian': 'bul_Cyrl',
    'Catalan': 'cat_Latn',
    'Cebuano': 'ceb_Latn',
    'Czech': 'ces_Latn',
    'Chokwe': 'cjk_Latn',
    'Kurdish (Central)': 'ckb_Arab',
    'Crimean Tatar': 'crh_Latn',
    'Welsh': 'cym_Latn',
    'Danish': 'dan_Latn',
    'German': 'deu_Latn',
    'Dinka': 'dik_Latn',
    'Dyula': 'dyu_Latn',
    'Dzongkha': 'dzo_Tibt',
    'Greek': 'ell_Grek',
    'English': 'eng_Latn',
    'Esperanto': 'epo_Latn',
    'Estonian': 'est_Latn',
    'Basque': 'eus_Latn',
    'Ewe': 'ewe_Latn',
    'Faroese': 'fao_Latn',
    'Persian': 'pes_Arab',
    'Fijian': 'fij_Latn',
    'Finnish': 'fin_Latn',
    'Fon': 'fon_Latn',
    'French': 'fra_Latn',
    'Friulian': 'fur_Latn',
    'Nigerian Fulfulde': 'fuv_Latn',
    'Scottish Gaelic': 'gla_Latn',
    'Irish': 'gle_Latn',
    'Galician': 'glg_Latn',
    'Guarani': 'grn_Latn',
    'Gujarati': 'guj_Gujr',
    'Haitian Creole': 'hat_Latn',
    'Hausa': 'hau_Latn',
    'Hebrew': 'heb_Hebr',
    'Hindi': 'hin_Deva',
    'Chhattisgarhi': 'hne_Deva',
    'Croatian': 'hrv_Latn',
    'Hungarian': 'hun_Latn',
    'Armenian': 'hye_Armn',
    'Igbo': 'ibo_Latn',
    'Ilocano': 'ilo_Latn',
    'Indonesian': 'ind_Latn',
    'Icelandic': 'isl_Latn',
    'Italian': 'ita_Latn',
    'Javanese': 'jav_Latn',
    'Japanese': 'jpn_Jpan',
    'Kabyle': 'kab_Latn',
    'Jingpho': 'kac_Latn',
    'Kamba': 'kam_Latn',
    'Kannada': 'kan_Knda',
    'Kashmiri (Arabic)': 'kas_Arab',
    'Kashmiri (Devanagari)': 'kas_Deva',
    'Georgian': 'kat_Geor',
    'Kanuri (Arabic)': 'knc_Arab',
    'Kanuri (Latin)': 'knc_Latn',
    'Kazakh': 'kaz_Cyrl',
    'Kabiyè': 'kbp_Latn',
    'Kabuverdianu': 'kea_Latn',
    'Khmer': 'khm_Khmr',
    'Kikuyu': 'kik_Latn',
    'Kinyarwanda': 'kin_Latn',
    'Kyrgyz': 'kir_Cyrl',
    'Kimbundu': 'kmb_Latn',
    'Kongo': 'kon_Latn',
    'Korean': 'kor_Hang',
    'Kurdish (Northern)': 'kmr_Latn',
    'Lao': 'lao_Laoo',
    'Latvian': 'lvs_Latn',
    'Ligurian': 'lij_Latn',
    'Limburgish': 'lim_Latn',
    'Lingala': 'lin_Latn',
    'Lithuanian': 'lit_Latn',
    'Lombard': 'lmo_Latn',
    'Latgalian': 'ltg_Latn',
    'Luxembourgish': 'ltz_Latn',
    'Luba-Kasai': 'lua_Latn',
    'Ganda': 'lug_Latn',
    'Luo': 'luo_Latn',
    'Mizo': 'lus_Latn',
    'Magahi': 'mag_Deva',
    'Maithili': 'mai_Deva',
    'Malayalam': 'mal_Mlym',
    'Marathi': 'mar_Deva',
    'Minangkabau': 'min_Latn',
    'Macedonian': 'mkd_Cyrl',
    'Plateau Malagasy': 'plt_Latn',
    'Maltese': 'mlt_Latn',
    'Manipuri': 'mni_Beng',
    'Mongolian': 'khk_Cyrl',
    'Mossi': 'mos_Latn',
    'Māori': 'mri_Latn',
    'Malay': 'zsm_Latn',
    'Burmese': 'mya_Mymr',
    'Dutch': 'nld_Latn',
    'Norwegian Nynorsk': 'nno_Latn',
    'Norwegian Bokmål': 'nob_Latn',
    'Nepali': 'npi_Deva',
    'Northern Sotho': 'nso_Latn',
    'Nuer': 'nus_Latn',
    'Nyanja': 'nya_Latn',
    'Occitan': 'oci_Latn',
    'West Central Oromo': 'gaz_Latn',
    'Odia': 'ory_Orya',
    'Pangasinan': 'pag_Latn',
    'Punjabi': 'pan_Guru',
    'Papiamento': 'pap_Latn',
    'Polish': 'pol_Latn',
    'Portuguese': 'por_Latn',
    'Persian (Dari)': 'prs_Arab',
    'Pashto': 'pbt_Arab',
    'Quechua': 'quy_Latn',
    'Romanian': 'ron_Latn',
    'Rundi': 'run_Latn',
    'Russian': 'rus_Cyrl',
    'Sango': 'sag_Latn',
    'Sanskrit': 'san_Deva',
    'Santali': 'sat_Beng',
    'Sicilian': 'scn_Latn',
    'Shan': 'shn_Mymr',
    'Sinhala': 'sin_Sinh',
    'Slovak': 'slk_Latn',
    'Slovenian': 'slv_Latn',
    'Samoan': 'smo_Latn',
    'Shona': 'sna_Latn',
    'Sindhi': 'snd_Arab',
    'Somali': 'som_Latn',
    'Southern Sotho': 'sot_Latn',
    'Spanish': 'spa_Latn',
    'Albanian (Tosk)': 'als_Latn',
    'Sardinian': 'srd_Latn',
    'Serbian': 'srp_Cyrl',
    'Swati': 'ssw_Latn',
    'Sundanese': 'sun_Latn',
    'Swedish': 'swe_Latn',
    'Swahili': 'swh_Latn',
    'Silesian': 'szl_Latn',
    'Tamil': 'tam_Taml',
    'Tatar': 'tat_Cyrl',
    'Telugu': 'tel_Telu',
    'Tajik': 'tgk_Cyrl',
    'Tagalog': 'tgl_Latn',
    'Thai': 'tha_Thai',
    'Tigrinya': 'tir_Ethi',
    'Tamasheq (Latin)': 'taq_Latn',
    'Tamasheq (Tifinagh)': 'taq_Tfng',
    'Tok Pisin': 'tpi_Latn',
    'Tswana': 'tsn_Latn',
    'Tsonga': 'tso_Latn',
    'Turkmen': 'tuk_Latn',
    'Tumbuka': 'tum_Latn',
    'Turkish': 'tur_Latn',
    'Twi': 'twi_Latn',
    'Central Atlas Tamazight': 'tzm_Tfng',
    'Uyghur': 'uig_Arab',
    'Ukrainian': 'ukr_Cyrl',
    'Umbundu': 'umb_Latn',
    'Urdu': 'urd_Arab',
    'Uzbek (Northern)': 'uzn_Latn',
    'Venetian': 'vec_Latn',
    'Vietnamese': 'vie_Latn',
    'Waray': 'war_Latn',
    'Wolof': 'wol_Latn',
    'Xhosa': 'xho_Latn',
    'Yiddish': 'ydd_Hebr',
    'Yoruba': 'yor_Latn',
    'Cantonese': 'yue_Hant',
    'Chinese (Simplified)': 'zho_Hans',
    'Chinese (Traditional)': 'zho_Hant',
    'Zulu': 'zul_Latn',
    # Legacy mappings for backward compatibility
    'Chinese (Mandarin)': 'zho_Hans',
    'Arabic': 'arb_Arab'
}

# Cache for punctuation model
punctuation_model_cache = None

def get_punctuation_model():
    """Load and cache punctuation restoration model."""
    global punctuation_model_cache
    if punctuation_model_cache is None:
        try:
            print("Loading punctuation model...")
            punctuation_model_cache = PunctuationModel()
            print("✅ Punctuation model loaded successfully.")
        except Exception as e:
            print(f"❌ Failed to load punctuation model: {e}")
            punctuation_model_cache = None
    return punctuation_model_cache

def get_nllb_translator():
    """Load and cache NLLB translation model."""
    model_name = "facebook/nllb-200-distilled-600M"
    
    if model_name in model_cache:
        return model_cache[model_name]
    
    try:
        print(f"Loading NLLB translation model: {model_name}...")
        translator = pipeline("translation", model=model_name, device=device)
        model_cache[model_name] = translator
        print("✅ NLLB translation model loaded successfully.")
        return translator
    except Exception as e:
        print(f"❌ Failed to load NLLB model {model_name}. Error: {e}")
        raise e

def get_whisper_model():
    """Load and cache Whisper model for audio transcription."""
    model_name = "whisper"
    
    if model_name in model_cache:
        return model_cache[model_name]
    
    try:
        print("Loading Whisper model...")
        whisper_model = whisper.load_model("base")  # Use base model for good balance of speed/accuracy
        model_cache[model_name] = whisper_model
        print("✅ Whisper model loaded successfully.")
        return whisper_model
    except Exception as e:
        print(f"❌ Failed to load Whisper model. Error: {e}")
        return None

# --- API Endpoints ---
@app.get("/", tags=["Health Check"])
def read_root():
    return {"status": "ok", "message": "NLLB Translation API with Punctuation is running"}

@app.options("/api/translate", tags=["CORS"])
async def options_translate():
    """Handle preflight OPTIONS requests for CORS"""
    return {"message": "OK"}

@app.post("/api/translate", tags=["Translation"])
async def translate_text(request: TranslationRequest):
    """
    Restores punctuation and then translates text.
    """
    try:
        if not request.text.strip():
            return {"translated_text": ""}

        # Step 1: Restore punctuation
        punctuation_model = get_punctuation_model()
        if punctuation_model:
            punctuated_text = punctuation_model.restore_punctuation(request.text)
            print(f"Original Text: '{request.text}' -> Punctuated Text: '{punctuated_text}'")
        else:
            punctuated_text = request.text
            print(f"Punctuation model not available, using original text: '{request.text}'")

        # Step 2: Translate the corrected text
        source_code = nllb_language_codes.get(request.source_language)
        target_code = nllb_language_codes.get(request.target_language)

        if not source_code or not target_code:
            raise ValueError("Unsupported language specified.")

        translator = get_nllb_translator()
        
        result = translator(
            punctuated_text, 
            src_lang=source_code, 
            tgt_lang=target_code
        )
        
        translated_text = result[0]['translation_text'].strip()

        return {"translated_text": translated_text}

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        print(f"An error occurred during translation: {e}")
        raise HTTPException(status_code=500, detail="Failed to translate text.")

@app.post("/api/transcribe-and-translate", tags=["Audio Processing"])
async def transcribe_and_translate(request: AudioTranscriptionRequest):
    """
    Transcribe audio using Whisper and then translate the result.
    """
    try:
        # Decode base64 audio
        audio_bytes = base64.b64decode(request.audio_data)
        
        # Get Whisper model
        whisper_model = get_whisper_model()
        if not whisper_model:
            raise HTTPException(status_code=500, detail="Whisper model not available")
        
        # Create temporary audio file
        with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as temp_audio:
            temp_audio.write(audio_bytes)
            temp_audio_path = temp_audio.name
        
        try:
            # Transcribe using Whisper
            result = whisper_model.transcribe(temp_audio_path)
            transcribed_text = result["text"].strip()
            
            if not transcribed_text:
                return {
                    "transcribed_text": "", 
                    "translated_text": "",
                    "detected_language": result.get("language", "unknown")
                }
            
            # Step 1: Restore punctuation
            punctuation_model = get_punctuation_model()
            if punctuation_model:
                punctuated_text = punctuation_model.restore_punctuation(transcribed_text)
                print(f"Transcribed: '{transcribed_text}' -> Punctuated: '{punctuated_text}'")
            else:
                punctuated_text = transcribed_text
                print(f"Punctuation model not available, using transcribed text: '{transcribed_text}'")
            
            # Step 2: Translate the transcribed text
            source_code = nllb_language_codes.get(request.source_language)
            target_code = nllb_language_codes.get(request.target_language)
            
            if not source_code or not target_code:
                raise ValueError("Unsupported language specified.")
            
            translator = get_nllb_translator()
            translation_result = translator(
                punctuated_text, 
                src_lang=source_code, 
                tgt_lang=target_code
            )
            
            translated_text = translation_result[0]['translation_text'].strip()
            
            return {
                "transcribed_text": punctuated_text,
                "translated_text": translated_text,
                "detected_language": result.get("language", "unknown")
            }
            
        finally:
            # Clean up temporary file
            os.unlink(temp_audio_path)
            
    except Exception as e:
        print(f"An error occurred during transcription: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process audio: {str(e)}")

# Auto-load models at startup (optional)
@app.on_event("startup")
async def startup_event():
    """Load models when the server starts"""
    print("🚀 Server starting up...")
    # Pre-load models (optional)
    get_punctuation_model()
    get_nllb_translator()
    print("✅ Server startup complete")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)