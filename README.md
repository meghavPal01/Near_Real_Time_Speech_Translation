# 🌍 Near-Real-Time Speech Translator

A modern, real-time speech-to-text translation application built with React, FastAPI, and advanced speech recognition technology..

## ✨ Features

- **🎤 Real-time Speech Recognition**: Instant voice-to-text conversion
- **🌐 Multi-language Translation**: Support for 200+ languages via NLLB-200
- **🎯 System Audio Capture**: Capture audio from meetings and calls
- **📝 Punctuation Restoration**: AI-powered punctuation for natural text
- **⚡ Fast Processing**: Optimized for real-time performance
- **🎨 Modern UI**: Clean, responsive design with dark mode support Translator

A modern, real-time speech-to-text translation application available as both a web app and Chrome extension. Built with React, FastAPI, and advanced speech recognition technology.

## ✨ Features

- **🎤 Real-time Speech Recognition**: Live audio capture with Web Speech API
- **🌐 50+ Language Support**: Comprehensive language coverage for translation and speech recognition
- **� Dual Platform**: Web application and Chrome extension with unified UI

## Demo
<img width="1680" height="1050" alt="Screenshot 2025-10-15 at 9 58 07 AM" src="https://github.com/user-attachments/assets/a2040534-55a5-4680-8b43-840dc960982b" />
<img width="3360" height="2100" alt="Screenshot 2025-10-15 at 9 57 52 AM" src="https://github.com/user-attachments/assets/7afa8515-a308-4127-b4ea-34fcd0d0a8bf" />

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd back-end
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# OR venv\Scripts\activate   # On Windows
pip install -r requirements.txt
python main.py
```
**Backend runs on:** `http://localhost:8000`

### 2. Frontend Setup
```bash
cd front-end
npm install
npm run dev
# Opens: http://localhost:5173
```
## 📁 Project Structure

```
real-time-translator/
├── back-end/                    # FastAPI Translation Server
│   ├── main.py                 # FastAPI server with NLLB integration
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables (gitignored)
│   └── venv/                   # Virtual environment (gitignored)
│
├── front-end/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TranslatorApp.jsx    # Main translation component
│   │   │   ├── LanguageSelector.jsx # Language selection component
│   │   │   └── TranslationPanel.jsx # Translation display component
│   │   ├── App.jsx             # Web app entry point
│   │   └── main.jsx            # React DOM setup
│   │
│   ├── dist/                   # Build output (gitignored)
│   ├── public/                 # Static assets
│   ├── index.html              # Web app HTML template
│   ├── package.json            # Node.js dependencies & scripts
│   ├── vite.config.js          # Vite build configuration
│   └── tailwind.config.js      # Tailwind CSS configuration
│
├── .gitignore                  # Git ignore patterns
└── README.md                   # This file
```

## 🔨 Build Commands

### Development
```bash
cd front-end
npm run dev              # Start development server
```

### Production Build
```bash
npm run build            # Build for production → dist/
npm run preview          # Preview production build
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Web Speech API** - Browser speech recognition

### Backend
- **FastAPI** - Modern Python web framework
- **NLLB-200** - Facebook's multilingual translation model
- **CORS Middleware** - Cross-origin request handling
- **Uvicorn** - Lightning-fast ASGI server

### Browser Extension
- **Manifest V3** - Latest Chrome extension API
- **Content Scripts** - Page injection capabilities
- **Service Worker** - Background processing

## 📊 Features Comparison

| Feature | Web App 🌐 | Chrome Extension 📱 |
|---------|-------------|---------------------|
| **Access Method** | Direct browser URL | Browser extension popup |
| **Installation** | None required | One-time Chrome installation |
| **UI/UX** | Full-screen experience | Compact popup interface |
| **Target Use** | General translation tasks | Meeting/conference integration |
| **Platform Support** | Any modern browser | Chrome-based browsers |
| **Page Integration** | Standalone application | Injects into meeting platforms |
| **Offline Capability** | Limited (cached assets) | Better caching & background processing |
| **Updates** | Automatic on page refresh | Manual extension updates |
| **Sharing** | Easy (just share URL) | Requires individual installation |
| **Speech Recognition** | ✅ 50+ languages | ✅ 50+ languages |
| **Real-time Translation** | ✅ NLLB-200 model | ✅ NLLB-200 model |
| **Dark Mode** | ✅ Auto-detection | ✅ Auto-detection |

## 🌍 Supported Languages

### Speech Recognition (50+ languages)
- **English** (en-US), **Spanish** (es-ES), **French** (fr-FR)
- **German** (de-DE), **Italian** (it-IT), **Portuguese** (pt-PT)
- **Chinese** (zh-CN), **Japanese** (ja-JP), **Korean** (ko-KR)
- **Arabic** (ar-SA), **Russian** (ru-RU), **Hindi** (hi-IN)
- And many more...

### Translation (200+ language pairs)
- Powered by Facebook's NLLB-200 model
- Supports all major world languages
- High-quality neural machine translation
- Optimized for real-time performance

## 🚀 Deployment Options

### Web App Hosting
- **Vercel**: Connect GitHub repo for auto-deployment
- **Netlify**: Drag-and-drop `web-build/` folder
- **GitHub Pages**: Upload build artifacts
- **Firebase Hosting**: Deploy with CLI
- **AWS S3**: Static website hosting
- **Custom Server**: Serve static files from `web-build/`

### Chrome Extension Distribution
- **Chrome Web Store**: Official distribution (requires developer account)
- **Developer Mode**: Local installation for testing
- **Enterprise Distribution**: Internal company deployment
- **Unpacked Extension**: Share `dist/` folder directly

## ⚙️ Configuration

### Backend Environment (.env)
```env
# Server Configuration
API_PORT=8000
API_HOST=0.0.0.0

# CORS Settings (update for production)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,chrome-extension://*

# Translation Model
TRANSLATION_SERVICE=nllb
MODEL_NAME=facebook/nllb-200-distilled-600M

# Optional: Custom model settings
DEVICE=cpu  # or 'cuda' for GPU acceleration
MAX_LENGTH=512
```

### Extension Manifest (manifest-updated.json)
- **Meeting Platforms**: Add more domains to `content_scripts.matches`
- **Permissions**: Modify based on required capabilities
- **Icons**: Update with custom branding
- **Version**: Increment for Chrome Web Store updates

## 📖 Usage Guide

### Web Application
1. **Launch**: Open the web app URL in your browser
2. **Select Languages**: Choose source and target languages from dropdowns
3. **Grant Permissions**: Allow microphone access when prompted
4. **Start Translation**: Click the microphone button to begin
5. **Speak Clearly**: Talk into your microphone in the source language
6. **View Results**: See real-time transcription and translation
7. **Copy Text**: Use copy buttons to share translations

### Chrome Extension  
1. **Install Extension**: Load unpacked or install from Chrome Web Store
2. **Join Meeting**: Navigate to supported meeting platform
3. **Open Extension**: Click the extension icon in Chrome toolbar
4. **Inject Translator**: Click "Inject Translator" button
5. **Position Panel**: Drag the floating translation panel as needed
6. **Configure**: Select languages and start translating
7. **Toggle Visibility**: Hide/show panel using extension popup

## Supported Platforms 🌐

### Web App
- ✅ Chrome, Safari, Firefox, Edge
- ✅ Mobile browsers (responsive design)
- ✅ Progressive Web App features
- ✅ Works offline (limited functionality)

### Extension Platforms
- ✅ **Google Meet** (meet.google.com)
- ✅ **Zoom** (zoom.us) 
- ✅ **Microsoft Teams** (teams.microsoft.com)
- ✅ **Cisco Webex** (webex.com)
- ✅ **Whereby** (whereby.com)
- ✅ **Discord** (discord.com)
- 🔄 More platforms can be added easily

## API Endpoints 🔌

### Translation API
```http
POST http://localhost:8000/translate
Content-Type: application/json

{
  "text": "Hello, how are you?",
  "from_lang": "en",
  "to_lang": "es"
}

Response:
{
  "translated_text": "Hola, ¿cómo estás?",
  "from_lang": "en", 
  "to_lang": "es",
  "original_text": "Hello, how are you?"
}
```

### Health Check
```http
GET http://localhost:8000/health

Response: 200 OK
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## 🔧 Troubleshooting

### Common Issues

#### Backend Connection Issues
```bash
# Check if backend is running
curl http://localhost:8000/health

# Restart backend server
cd back-end
source venv/bin/activate
python main.py
```

#### Speech Recognition Problems
- **Browser Support**: Use Chrome, Safari, or Edge (Firefox has limited support)
- **HTTPS Requirement**: Production sites need HTTPS for microphone access
- **Permissions**: Grant microphone access when prompted
- **Language Selection**: Ensure source language matches speech recognition capabilities

#### Extension Loading Issues
- **Developer Mode**: Must be enabled in `chrome://extensions/`
- **Manifest Errors**: Check browser console for syntax errors
- **File Permissions**: Ensure `dist/` folder has proper read permissions
- **Cache Issues**: Try hard refresh (Ctrl+F5) or restart Chrome

#### Translation Quality Issues
- **Model Performance**: NLLB-200 quality varies by language pair
- **Audio Quality**: Use a good microphone for better speech recognition
- **Network Latency**: Check internet connection for API calls
- **Text Length**: Very long texts may take longer to translate

#### Styling Problems
- **Dark Mode**: Should auto-detect based on system preferences
- **Layout Issues**: Try different browser zoom levels
- **Extension UI**: Ensure content script injection is successful

### Performance Optimization

#### Backend Performance
```python
# For GPU acceleration (if available)
DEVICE=cuda

# Increase worker processes (production)
uvicorn main:app --workers 4

# Enable model caching
MODEL_CACHE=true
```

#### Frontend Performance
- **Audio Processing**: Web Speech API runs locally (no server load)
- **Translation Caching**: Implement client-side caching for repeated phrases
- **Network Optimization**: Use request debouncing for real-time input
- **Bundle Size**: Extension build is optimized for minimal size

## 🛡️ Security & Privacy

### Data Handling
- **No Storage**: Audio and translations are not stored anywhere
- **Local Processing**: Speech recognition happens in the browser
- **API Security**: Translation API only processes text temporarily
- **No Tracking**: No analytics or user tracking implemented

### Browser Permissions
- **Microphone**: Required for speech recognition
- **Active Tab**: Extension needs access to inject translator
- **Host Permissions**: Limited to specified meeting platforms
- **Storage**: Minimal local storage for user preferences

### Production Security
- **HTTPS**: Required for microphone access in production
- **CORS**: Configure appropriate origins for your domain
- **API Rate Limiting**: Consider implementing for public deployments
- **Content Security Policy**: Update for your hosting environment

## 🤝 Contributing

### Development Setup
```bash
# Clone repository
git clone <repository-url>
cd real-time-translator

# Backend setup
cd back-end
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend setup
cd ../front-end
npm install
npm run dev
```

### Code Style
- **React**: Follow React 19 best practices
- **Python**: PEP 8 style guide
- **JavaScript**: ESLint configuration included
- **CSS**: Tailwind utility classes preferred

### Pull Request Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Test your changes thoroughly
4. Update documentation as needed
5. Submit a pull request with clear description

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentation**: This README and inline code comments
- **Community**: Contribute to make it better!

---

## 🎉 Ready to Get Started?

1. **Quick Test**: `npm run dev` for web app development
2. **Extension**: `npm run build:extension` for Chrome extension
3. **Production**: Deploy web app to your favorite hosting platform
4. **Share**: Help others break language barriers! 🌍✨

**Break language barriers with real-time translation!** 🚀
