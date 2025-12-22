import React, { useState, useRef, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import TranslationPanel from "./TranslationPanel";

// Complete NLLB language mapping
const languages = {
  "Acehnese (Arabic)": "ace_Arab",
  "Acehnese (Latin)": "ace_Latn",
  "Arabic (Mesopotamian)": "acm_Arab",
  "Arabic (Ta'izzi-Adeni)": "acq_Arab",
  "Arabic (Tunisian)": "aeb_Arab",
  Afrikaans: "afr_Latn",
  "Arabic (South Levantine)": "ajp_Arab",
  Akan: "aka_Latn",
  Amharic: "amh_Ethi",
  "Arabic (North Levantine)": "apc_Arab",
  "Arabic (Standard)": "arb_Arab",
  "Arabic (Najdi)": "ars_Arab",
  "Arabic (Moroccan)": "ary_Arab",
  "Arabic (Egyptian)": "arz_Arab",
  Assamese: "asm_Beng",
  Asturian: "ast_Latn",
  Awadhi: "awa_Deva",
  Aymara: "ayr_Latn",
  "Azerbaijani (South)": "azb_Arab",
  "Azerbaijani (North)": "azj_Latn",
  Bashkir: "bak_Cyrl",
  Bambara: "bam_Latn",
  Balinese: "ban_Latn",
  Belarusian: "bel_Cyrl",
  Bemba: "bem_Latn",
  Bengali: "ben_Beng",
  Bhojpuri: "bho_Deva",
  "Banjar (Arabic)": "bjn_Arab",
  "Banjar (Latin)": "bjn_Latn",
  Tibetan: "bod_Tibt",
  Bosnian: "bos_Latn",
  Buginese: "bug_Latn",
  Bulgarian: "bul_Cyrl",
  Catalan: "cat_Latn",
  Cebuano: "ceb_Latn",
  Czech: "ces_Latn",
  Chokwe: "cjk_Latn",
  "Kurdish (Central)": "ckb_Arab",
  "Crimean Tatar": "crh_Latn",
  Welsh: "cym_Latn",
  Danish: "dan_Latn",
  German: "deu_Latn",
  Dinka: "dik_Latn",
  Dyula: "dyu_Latn",
  Dzongkha: "dzo_Tibt",
  Greek: "ell_Grek",
  English: "eng_Latn",
  Esperanto: "epo_Latn",
  Estonian: "est_Latn",
  Basque: "eus_Latn",
  Ewe: "ewe_Latn",
  Faroese: "fao_Latn",
  Persian: "pes_Arab",
  Fijian: "fij_Latn",
  Finnish: "fin_Latn",
  Fon: "fon_Latn",
  French: "fra_Latn",
  Friulian: "fur_Latn",
  "Nigerian Fulfulde": "fuv_Latn",
  "Scottish Gaelic": "gla_Latn",
  Irish: "gle_Latn",
  Galician: "glg_Latn",
  Guarani: "grn_Latn",
  Gujarati: "guj_Gujr",
  "Haitian Creole": "hat_Latn",
  Hausa: "hau_Latn",
  Hebrew: "heb_Hebr",
  Hindi: "hin_Deva",
  Chhattisgarhi: "hne_Deva",
  Croatian: "hrv_Latn",
  Hungarian: "hun_Latn",
  Armenian: "hye_Armn",
  Igbo: "ibo_Latn",
  Ilocano: "ilo_Latn",
  Indonesian: "ind_Latn",
  Icelandic: "isl_Latn",
  Italian: "ita_Latn",
  Javanese: "jav_Latn",
  Japanese: "jpn_Jpan",
  Kabyle: "kab_Latn",
  Jingpho: "kac_Latn",
  Kamba: "kam_Latn",
  Kannada: "kan_Knda",
  "Kashmiri (Arabic)": "kas_Arab",
  "Kashmiri (Devanagari)": "kas_Deva",
  Georgian: "kat_Geor",
  "Kanuri (Arabic)": "knc_Arab",
  "Kanuri (Latin)": "knc_Latn",
  Kazakh: "kaz_Cyrl",
  Kabiyè: "kbp_Latn",
  Kabuverdianu: "kea_Latn",
  Khmer: "khm_Khmr",
  Kikuyu: "kik_Latn",
  Kinyarwanda: "kin_Latn",
  Kyrgyz: "kir_Cyrl",
  Kimbundu: "kmb_Latn",
  Kongo: "kon_Latn",
  Korean: "kor_Hang",
  "Kurdish (Northern)": "kmr_Latn",
  Lao: "lao_Laoo",
  Latvian: "lvs_Latn",
  Ligurian: "lij_Latn",
  Limburgish: "lim_Latn",
  Lingala: "lin_Latn",
  Lithuanian: "lit_Latn",
  Lombard: "lmo_Latn",
  Latgalian: "ltg_Latn",
  Luxembourgish: "ltz_Latn",
  "Luba-Kasai": "lua_Latn",
  Ganda: "lug_Latn",
  Luo: "luo_Latn",
  Mizo: "lus_Latn",
  Magahi: "mag_Deva",
  Maithili: "mai_Deva",
  Malayalam: "mal_Mlym",
  Marathi: "mar_Deva",
  Minangkabau: "min_Latn",
  Macedonian: "mkd_Cyrl",
  "Plateau Malagasy": "plt_Latn",
  Maltese: "mlt_Latn",
  Manipuri: "mni_Beng",
  Mongolian: "khk_Cyrl",
  Mossi: "mos_Latn",
  Māori: "mri_Latn",
  Malay: "zsm_Latn",
  Burmese: "mya_Mymr",
  Dutch: "nld_Latn",
  "Norwegian Nynorsk": "nno_Latn",
  "Norwegian Bokmål": "nob_Latn",
  Nepali: "npi_Deva",
  "Northern Sotho": "nso_Latn",
  Nuer: "nus_Latn",
  Nyanja: "nya_Latn",
  Occitan: "oci_Latn",
  "West Central Oromo": "gaz_Latn",
  Odia: "ory_Orya",
  Pangasinan: "pag_Latn",
  Punjabi: "pan_Guru",
  Papiamento: "pap_Latn",
  Polish: "pol_Latn",
  Portuguese: "por_Latn",
  "Persian (Dari)": "prs_Arab",
  Pashto: "pbt_Arab",
  Quechua: "quy_Latn",
  Romanian: "ron_Latn",
  Rundi: "run_Latn",
  Russian: "rus_Cyrl",
  Sango: "sag_Latn",
  Sanskrit: "san_Deva",
  Santali: "sat_Beng",
  Sicilian: "scn_Latn",
  Shan: "shn_Mymr",
  Sinhala: "sin_Sinh",
  Slovak: "slk_Latn",
  Slovenian: "slv_Latn",
  Samoan: "smo_Latn",
  Shona: "sna_Latn",
  Sindhi: "snd_Arab",
  Somali: "som_Latn",
  "Southern Sotho": "sot_Latn",
  Spanish: "spa_Latn",
  "Albanian (Tosk)": "als_Latn",
  Sardinian: "srd_Latn",
  Serbian: "srp_Cyrl",
  Swati: "ssw_Latn",
  Sundanese: "sun_Latn",
  Swedish: "swe_Latn",
  Swahili: "swh_Latn",
  Silesian: "szl_Latn",
  Tamil: "tam_Taml",
  Tatar: "tat_Cyrl",
  Telugu: "tel_Telu",
  Tajik: "tgk_Cyrl",
  Tagalog: "tgl_Latn",
  Thai: "tha_Thai",
  Tigrinya: "tir_Ethi",
  "Tamasheq (Latin)": "taq_Latn",
  "Tamasheq (Tifinagh)": "taq_Tfng",
  "Tok Pisin": "tpi_Latn",
  Tswana: "tsn_Latn",
  Tsonga: "tso_Latn",
  Turkmen: "tuk_Latn",
  Tumbuka: "tum_Latn",
  Turkish: "tur_Latn",
  Twi: "twi_Latn",
  "Central Atlas Tamazight": "tzm_Tfng",
  Uyghur: "uig_Arab",
  Ukrainian: "ukr_Cyrl",
  Umbundu: "umb_Latn",
  Urdu: "urd_Arab",
  "Uzbek (Northern)": "uzn_Latn",
  Venetian: "vec_Latn",
  Vietnamese: "vie_Latn",
  Waray: "war_Latn",
  Wolof: "wol_Latn",
  Xhosa: "xho_Latn",
  Yiddish: "ydd_Hebr",
  Yoruba: "yor_Latn",
  Cantonese: "yue_Hant",
  "Chinese (Simplified)": "zho_Hans",
  "Chinese (Traditional)": "zho_Hant",
  Zulu: "zul_Latn",
};

const languageNames = Object.keys(languages);

// Speech Recognition language codes mapping
const speechRecognitionLanguages = {
  English: "en-US",
  Spanish: "es-ES",
  French: "fr-FR",
  German: "de-DE",
  Italian: "ita",
  Portuguese: "pt-PT",
  Russian: "ru-RU",
  Japanese: "ja-JP",
  Korean: "ko-KR",
  "Chinese (Simplified)": "zh-CN",
  "Chinese (Traditional)": "zh-TW",
  "Arabic (Standard)": "ar-SA",
  Hindi: "hi-IN",
  Dutch: "nl-NL",
  Polish: "pl-PL",
  Turkish: "tr-TR",
  Swedish: "sv-SE",
  Norwegian: "no-NO",
  Danish: "da-DK",
  Finnish: "fi-FI",
  Greek: "el-GR",
  Hebrew: "he-IL",
  Czech: "cs-CZ",
  Hungarian: "hu-HU",
  Romanian: "ro-RO",
  Bulgarian: "bg-BG",
  Croatian: "hr-HR",
  Slovak: "sk-SK",
  Slovenian: "sl-SI",
  Estonian: "et-EE",
  Latvian: "lv-LV",
  Lithuanian: "lt-LT",
  Ukrainian: "uk-UA",
  Bengali: "bn-IN",
  Gujarati: "gu-IN",
  Kannada: "kn-IN",
  Malayalam: "ml-IN",
  Marathi: "mr-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Urdu: "ur-PK",
  Thai: "th-TH",
  Vietnamese: "vi-VN",
  Indonesian: "id-ID",
  Malay: "ms-MY",
  Catalan: "ca-ES",
  Basque: "eu-ES",
  Galician: "gl-ES",
  Welsh: "cy-GB",
  Irish: "ga-IE",
  "Scottish Gaelic": "gd-GB",
  Afrikaans: "af-ZA",
  Swahili: "sw-KE",
  Zulu: "zu-ZA",
  Yoruba: "yo-NG",
  Hausa: "ha-NG",
  Igbo: "ig-NG",
  Amharic: "am-ET",
  Somali: "so-SO",
  Icelandic: "is-IS",
  Maltese: "mt-MT",
  Albanian: "sq-AL",
  Macedonian: "mk-MK",
  Serbian: "sr-RS",
  Bosnian: "bs-BA",
  Montenegrin: "me-ME",
};

// Check for browser support for the Web Speech API
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Custom hook for audio capture functionality
const useAudioCapture = () => {
  const [audioStream, setAudioStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  //   const chunksRef = useRef([]);
  const processingIntervalRef = useRef(null);

  // Check browser support
  const checkBrowserSupport = () => {
    const issues = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      issues.push("getDisplayMedia not supported");
    }

    if (!window.AudioContext && !window.webkitAudioContext) {
      issues.push("AudioContext not supported");
    }

    return issues;
  };

  const startSystemAudioCapture = async (onAudioProcessed) => {
    try {
      // Check browser support first
      const supportIssues = checkBrowserSupport();
      if (supportIssues.length > 0) {
        throw new Error(
          `Browser compatibility issues: ${supportIssues.join(", ")}`
        );
      }

      console.log("🎤 Requesting display media with audio...");

      // Request screen share with audio
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true, // Required for getDisplayMedia
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      console.log("📺 Display media obtained, checking audio tracks...");

      // Check if audio track is available
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        throw new Error(
          'No audio track available. Please ensure "Share system audio" is enabled.'
        );
      }

      console.log(`🔊 Audio tracks found: ${audioTracks.length}`);
      audioTracks.forEach((track, index) => {
        console.log(`Track ${index}:`, track.label, track.kind, track.enabled);
      });

      setAudioStream(stream);
      setIsCapturing(true);

      // Set up Web Audio API for real-time processing
      console.log("🎛️ Setting up Web Audio API processing...");
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();

      // Create audio source from stream
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      // Connect source to analyser
      source.connect(analyserRef.current);

      // Set up real-time audio processing using ScriptProcessorNode
      const bufferSize = 4096;
      const processor = audioContextRef.current.createScriptProcessor(
        bufferSize,
        1,
        1
      );

      // Store audio chunks for processing
      const audioChunks = [];
      let chunkCount = 0;
      const CHUNKS_PER_BATCH = Math.floor((3 * 44100) / bufferSize); // About 3 seconds

      processor.onaudioprocess = (event) => {
        const inputBuffer = event.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);

        // Store audio data
        audioChunks.push(new Float32Array(inputData));
        chunkCount++;

        // Process every 3 seconds worth of audio
        if (chunkCount >= CHUNKS_PER_BATCH) {
          console.log("🔄 Processing audio batch...");
          processAudioChunks([...audioChunks], onAudioProcessed);
          audioChunks.length = 0; // Clear chunks
          chunkCount = 0;
        }
      };

      // Connect the processor
      source.connect(processor);
      processor.connect(audioContextRef.current.destination);

      // Store processor reference for cleanup
      mediaRecorderRef.current = processor;

      console.log("✅ System audio capture started with Web Audio API");
      return stream;
    } catch (error) {
      console.error("❌ Failed to capture system audio:", error);
      throw error;
    }
  };

  const processAudioChunks = async (chunks, onAudioProcessed) => {
    try {
      console.log(`� Processing ${chunks.length} audio chunks`);

      // Combine all chunks into a single buffer
      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const combinedBuffer = new Float32Array(totalLength);

      let offset = 0;
      for (const chunk of chunks) {
        combinedBuffer.set(chunk, offset);
        offset += chunk.length;
      }

      // Convert Float32Array to WAV format
      const wavBuffer = floatTo16BitPCM(combinedBuffer);
      const wavBlob = new Blob([wavBuffer], { type: "audio/wav" });

      // Convert to base64 for transmission
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result.split(",")[1];
        if (onAudioProcessed) {
          onAudioProcessed(base64Audio);
        }
      };
      reader.readAsDataURL(wavBlob);
    } catch (error) {
      console.error("Failed to process audio chunks:", error);
    }
  };

  // Helper function to convert Float32Array to 16-bit PCM WAV
  const floatTo16BitPCM = (float32Array) => {
    const sampleRate = 44100;
    const numChannels = 1;
    const bitsPerSample = 16;
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataLength = float32Array.length * bytesPerSample;
    const bufferLength = 44 + dataLength;

    const buffer = new ArrayBuffer(bufferLength);
    const view = new DataView(buffer);

    // WAV header
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, bufferLength - 8, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(36, "data");
    view.setUint32(40, dataLength, true);

    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < float32Array.length; i++) {
      const sample = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true
      );
      offset += 2;
    }

    return buffer;
  };

  const stopAudioCapture = () => {
    // Clear processing interval
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
      processingIntervalRef.current = null;
    }

    // Disconnect audio processor
    if (mediaRecorderRef.current && mediaRecorderRef.current.disconnect) {
      mediaRecorderRef.current.disconnect();
      mediaRecorderRef.current = null;
    }

    // Stop audio stream
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
    }

    // Close audio context
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }

    setIsCapturing(false);
    console.log("🛑 Audio capture stopped");
  };

  return {
    audioStream,
    isCapturing,
    startSystemAudioCapture,
    stopAudioCapture,
  };
};

function TranslatorApp() {
  // State management
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [statusMessage, setStatusMessage] = useState(
    'Choose audio source and click "Start Translating" to begin.'
  );
  const [captureMode, setCaptureMode] = useState("microphone"); // 'microphone' or 'system'

  // Using useRef to hold the full transcript to avoid stale state in callbacks
  const transcriptRef = useRef("");

  // Audio capture hooks
  const {
    audioStream,
    isCapturing,
    startSystemAudioCapture,
    stopAudioCapture,
  } = useAudioCapture();

  // Track if user manually stopped (to prevent auto-restart)
  const [shouldContinueListening, setShouldContinueListening] = useState(false);
  const shouldContinueRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    shouldContinueRef.current = shouldContinueListening;
  }, [shouldContinueListening]);

  // Speech recognition instance ref
  const recognitionRef = useRef(null);

  // Language change handlers with validation
  const handleSourceLanguageChange = (newLang) => {
    if (newLang === targetLang) {
      setStatusMessage(
        "⚠️ Source and target languages cannot be the same. Please select different languages."
      );
      return;
    }
    setSourceLang(newLang);
    setStatusMessage("Source language updated.");

    // If recognition is currently running, restart it with the new language
    if (isListening && recognitionRef.current) {
      console.log(`Restarting recognition with new language: ${newLang}`);
      const recognition = recognitionRef.current;
      recognition.stop(); // This will trigger onend and restart with new language
    }
  };

  const handleTargetLanguageChange = (newLang) => {
    if (newLang === sourceLang) {
      setStatusMessage(
        "⚠️ Source and target languages cannot be the same. Please select different languages."
      );
      return;
    }
    setTargetLang(newLang);
    setStatusMessage("Target language updated.");
  };

  // Capture mode change handler
  const handleCaptureModeChange = (newMode) => {
    // Stop any current recording/capturing when switching modes
    if (isListening || shouldContinueListening || isCapturing) {
      const recognition = recognitionRef.current;
      setShouldContinueListening(false);
      if (recognition) recognition.stop();
      stopAudioCapture();
      setIsListening(false);
    }

    setCaptureMode(newMode);

    if (newMode === "system") {
      setStatusMessage(
        '📺 System audio mode selected. Click "Start Capturing" to capture meeting audio.'
      );
    } else {
      setStatusMessage(
        '🎤 Microphone mode selected. Click "Start Listening" to capture your voice.'
      );
    }
  };

  // API call to the backend for translation
  const handleTranslate = async (text, source, target) => {
    if (!text.trim()) return;
    console.log("Translating:", { text, source, target });
    setStatusMessage("Translating...");
    try {
      const response = await fetch("http://localhost:8000/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          source_language: source, // Send full language name like "English"
          target_language: target, // Send full language name like "Spanish"
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Translation result:", data);
      // Replace the entire translated text instead of appending chunks
      setTranslatedText(data.translated_text);
      console.log("Setting translated text:", data.translated_text);
      setStatusMessage(
        isListening || isCapturing
          ? "Processing... (Translation updated)"
          : "Translation complete."
      );
    } catch (error) {
      console.error("Translation error:", error);
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  // Handle system audio processing via server-side speech recognition
  const handleSystemAudioProcessing = async (base64Audio) => {
    try {
      setStatusMessage("🔄 Processing captured audio...");

      const response = await fetch(
        "http://localhost:8000/api/transcribe-and-translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            audio_data: base64Audio,
            source_language: sourceLang,
            target_language: targetLang,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Audio processing failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Audio processing result:", data);

      if (data.transcribed_text && data.transcribed_text.trim()) {
        // Update transcripts with the new audio
        const newTranscript = data.transcribed_text.trim();
        transcriptRef.current = transcriptRef.current
          ? `${transcriptRef.current} ${newTranscript}`
          : newTranscript;
        setFinalTranscript(transcriptRef.current);

        // Set the translated text
        if (data.translated_text) {
          setTranslatedText(data.translated_text);
        }

        setStatusMessage(
          "🎵 Capturing system audio... (Processing live audio)"
        );
      } else {
        setStatusMessage("🎵 Capturing system audio... (Listening for speech)");
      }
    } catch (error) {
      console.error("System audio processing error:", error);
      setStatusMessage(`Error processing audio: ${error.message}`);
    }
  };

  // Setup and manage speech recognition events
  useEffect(() => {
    if (!SpeechRecognition) {
      setStatusMessage(
        "Sorry, your browser doesn't support speech recognition."
      );
      return;
    }

    // Initialize recognition if not already done
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
    }

    const recognition = recognitionRef.current;
    recognition.lang = speechRecognitionLanguages[sourceLang] || "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setInterimTranscript("");
      transcriptRef.current = finalTranscript; // Continue from where we left off
      setStatusMessage(
        "🎤 Listening continuously... Speak into your microphone."
      );
    };

    recognition.onend = () => {
      console.log(
        "Recognition ended, shouldContinueListening:",
        shouldContinueRef.current
      );
      // Use a ref to get the current value to avoid stale closure
      setTimeout(() => {
        if (shouldContinueRef.current && recognitionRef.current) {
          console.log("Auto-restarting recognition...");
          try {
            // Update language before restarting
            recognitionRef.current.lang = languages[sourceLang];
            recognitionRef.current.start();
          } catch (error) {
            console.error("Error restarting recognition:", error);
            setIsListening(false);
            setStatusMessage("Error restarting speech recognition.");
          }
        }
      }, 100); // Small delay to prevent rapid restart issues

      if (!shouldContinueRef.current) {
        setIsListening(false);
        setStatusMessage('Mic is off. Click "Start" to speak again.');
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setStatusMessage(
        `Error: ${event.error}. Please check microphone permissions.`
      );
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      console.log("Speech recognition result received:", event.results.length);
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      console.log("Interim:", interim, "Final:", final);
      setInterimTranscript(interim);

      if (final) {
        const newFinalText = final.trim();
        transcriptRef.current = transcriptRef.current
          ? `${transcriptRef.current} ${newFinalText}`
          : newFinalText;
        console.log("Setting final transcript:", transcriptRef.current);
        setFinalTranscript(transcriptRef.current);
        // Translate the entire accumulated text instead of just the new chunk
        handleTranslate(transcriptRef.current, sourceLang, targetLang);
      }
    };

    // Update recognition language when source language changes
    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onresult = null;
    };
  }, [sourceLang, targetLang, shouldContinueListening]); // Remove finalTranscript and isListening from dependencies

  // Start/Stop button handler - Modified to handle both capture modes
  const toggleListen = async () => {
    if (!SpeechRecognition || !recognitionRef.current) return;

    const recognition = recognitionRef.current;

    if (isListening || shouldContinueListening || isCapturing) {
      // Stop all listening/capturing
      setShouldContinueListening(false);
      recognition.stop();
      stopAudioCapture();
      setIsListening(false);
      setStatusMessage("Stopped.");
    } else {
      try {
        if (captureMode === "system") {
          // Start system audio capture with processing callback
          setStatusMessage("🔄 Starting system audio capture...");
          await startSystemAudioCapture(handleSystemAudioProcessing);
          setStatusMessage(
            "🎵 Capturing system audio. Processing speech from all participants..."
          );
        } else {
          // Start microphone capture (existing functionality)
          setShouldContinueListening(true);
          // Reset state for a new session
          setFinalTranscript("");
          setTranslatedText("");
          transcriptRef.current = "";
          recognition.lang = speechRecognitionLanguages[sourceLang] || "en-US";
          recognition.start();
        }
      } catch (error) {
        setStatusMessage(`❌ Error: ${error.message}`);
      }
    }
  };

  const clearTranslations = () => {
    setFinalTranscript("");
    setTranslatedText("");
    setInterimTranscript("");
    transcriptRef.current = "";
    setStatusMessage("Translations cleared. Ready to start.");
  };

  // Web app styling
  const containerClasses =
    "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center min-h-screen p-4 font-sans transition-colors duration-500";
  const cardClasses =
    "w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8";

  // Return web app UI
  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            Real-Time Speech Translator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Speak and get instant translations. Powered by React & FastAPI.
          </p>
        </header>

        {/* Audio Source Selection */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Audio Source
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="captureMode"
                value="microphone"
                checked={captureMode === "microphone"}
                onChange={(e) => handleCaptureModeChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <div className="font-medium text-gray-800 dark:text-white">
                  🎤 Microphone
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Capture your own voice
                </div>
              </div>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="captureMode"
                value="system"
                checked={captureMode === "system"}
                onChange={(e) => handleCaptureModeChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <div className="font-medium text-gray-800 dark:text-white">
                  🖥️ System Audio
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Capture meeting audio
                </div>
              </div>
            </label>
          </div>

          {captureMode === "system" && (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>📋 Instructions:</strong> When prompted, select "Share
                system audio" or your meeting tab/window. This captures all
                participants' audio for translation.
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                ⚠️ Note: System audio requires server-side speech processing for
                full functionality.
              </p>
            </div>
          )}
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="source-lang"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              From (Your Language)
            </label>
            <LanguageSelector
              id="source-lang"
              value={sourceLang}
              onChange={(e) => handleSourceLanguageChange(e.target.value)}
            >
              {languageNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </LanguageSelector>
          </div>
          <div>
            <label
              htmlFor="target-lang"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              To (Target Language)
            </label>
            <LanguageSelector
              id="target-lang"
              value={targetLang}
              onChange={(e) => handleTargetLanguageChange(e.target.value)}
            >
              {languageNames.map((name) => (
                <option key={name} value={name} disabled={name === sourceLang}>
                  {name}
                </option>
              ))}
            </LanguageSelector>
          </div>
        </div>

        {/* Control Button */}
        <div className="text-center my-6">
          <button
            id="start-btn"
            onClick={toggleListen}
            className={`px-8 py-4 text-white font-semibold rounded-full shadow-lg focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-auto ${
              shouldContinueListening || isListening || isCapturing
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800"
            }`}
          >
            {shouldContinueListening || isListening || isCapturing ? (
              <>
                <svg
                  className="w-6 h-6 mr-3 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  Stop {captureMode === "system" ? "Capturing" : "Listening"}
                </span>
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {captureMode === "system" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  )}
                </svg>
                <span>
                  Start {captureMode === "system" ? "Capturing" : "Listening"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {statusMessage}
          </p>
        </div>

        {/* Translation Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TranslationPanel
            title="What you're saying"
            text={
              finalTranscript +
              (interimTranscript ? ` ${interimTranscript}` : "")
            }
            placeholder="Your speech will appear here as you talk..."
            bgColor="bg-blue-50 dark:bg-blue-900/20"
            borderColor="border-blue-200 dark:border-blue-700"
          />
          <TranslationPanel
            title="Translation"
            text={translatedText}
            placeholder="Translated text will appear here..."
            bgColor="bg-green-50 dark:bg-green-900/20"
            borderColor="border-green-200 dark:border-green-700"
          />
        </div>

        {/* Clear Button */}
        <div className="text-center mt-6">
          <button
            onClick={clearTranslations}
            className="px-6 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Clear All Text
          </button>
        </div>
      </div>
    </div>
  );
}

export default TranslatorApp;
