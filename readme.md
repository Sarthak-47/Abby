# Abby

Abby is an AI-powered mental wellness application designed to provide accessible, anonymous, and meaningful therapeutic support. By engaging users in reflective conversations, Abby helps track emotional progress and build stronger coping strategies all from the comfort of their devices, utilizing state-of-the-art AI models.

---

## 🚀 Features

- **Anonymous AI Therapy:** Receive personalized emotional support without judgment.
- **Voice Interactions:** Talk naturally with voice synthesis powered by ElevenLabs for a lifelike experience.
- **Progress Tracking:** Automatic AI-based scoring evaluates your well-being and insights over time.
- **Modern UI:** Built with a minimal, intuitive, and responsive interface featuring smooth animations.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14
- **Styling:** TailwindCSS, shadcn/ui, MagicUI, DaisyUI, Framer Motion
- **State Management:** Zustand

### Backend & Database
- **Runtime & Framework:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Firebase Auth (Custom JWT with Cookies)

### AI Services
- **LLM:** Google Gemini 2.0 Flash for intelligent, empathetic conversation
- **TTS:** ElevenLabs for high-quality voice synthesis

---

## 🏃‍♂️ Running Locally

### Prerequisites
- Node.js (v18+)
- MongoDB cluster
- Firebase project
- Google Gemini API Key
- ElevenLabs account (optional, for voice)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/abby.git
cd abby
```

### 2. Set Up Environment Variables
You will need to create `.env` and `.env.local` files for both backend and frontend. Templates are provided below.

**Backend (`backend/.env`)**
```env
PORT=5000
MONGO_URI=your_mongo_uri_here
GOOGLE_API_KEY=your_google_api_key_here
FIREBASE_PROJECT_ID=your_firebase_project_id_here
FIREBASE_CLIENT_EMAIL=your_firebase_client_email_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

**Frontend (`frontend/.env.local`)**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Install Dependencies
**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the App
Visit `http://localhost:3000` in your browser.

---

## 🤔 Why Abby?

In many parts of the world, mental health is overlooked due to stigma and limited accessibility. Abby addresses this by providing free, anonymous, and conversational support to foster early mental health habits. While Abby does not replace professional therapy, it makes taking the first step easier.

---

## ⚡ Performance & Limitations

- **Cold Starts:** The app may be slow to respond initially if hosted on free-tier platforms (e.g., Render) due to cold start behavior.
- **Voice Fallback:** ElevenLabs API has a limited token quota. When exhausted, the application will automatically fall back to standard browser-based text-to-speech.

---

## 📄 License
This project is licensed under the MIT License.
