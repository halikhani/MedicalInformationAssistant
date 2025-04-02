# 🩺 Cross-Platform Medical Information Assistant

A React Native (Expo) app that allows users to ask voice-based questions about surgical procedures (e.g., ACL surgery, rotator cuff repair) and receive intelligent, patient-friendly medical information using OpenAI Whisper and GPT APIs.

---

## 🚀 Features

- 🎙️ Voice input using device microphone
- 🧠 Speech-to-text via OpenAI Whisper API
- 💡 Intelligent response generation using OpenAI GPT
- 📋 Extracted surgery type and intent (e.g., rehabilitation, precautions)
- 🧪 Test mode with predefined queries
- ⚙️ Built with React Native + Expo

---

## 🛠️ Getting Started

### 1. Clone or unzip the project

```bash
cd MedicalInfoAssistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set your OpenAI API Key

In both of these files:

- `utils/transcribeAudio.js`
- `utils/queryGPT.js`

Replace:

```js
const OPENAI_API_KEY = 'your_openai_api_key_here';
```

With your actual API key from: https://platform.openai.com/account/api-keys

⚠️ **Never share your real API key in public repos.**

---

### 4. Run the app

```bash
npx expo start
```

Then open it in the **Expo Go** app on your device, or use the iOS/Android emulator.

---

## 🧪 Test Mode

Tap the "Run Test with Sample Input" button in the app to test GPT integration using a predefined question (e.g., “What exercises after ACL surgery?”) without speaking.

---

## 🔮 Next Features

- 🔈 Improving speech to text quality
- 🌐 Web search API integration (e.g., Mayo Clinic links)
- 🧭 Navigation / chat history
- 📱 Native device storage for saved queries

---

## 🧑‍💻 Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [OpenAI GPT + Whisper APIs](https://platform.openai.com/docs)

---

