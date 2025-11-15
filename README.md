# Swasthya-Mitra
Swasthya-Mitra is a full-stack smart healthcare system built for Indian clinics and small hospitals. It handles everything from patient queue management to AI wait-time prediction, voice-based booking, and WhatsApp reminders — all in one place.  It’s like your clinic’s digital assistant that never sleeps 😎

Proposed intial folder structure (this may or may not be same , as of now)

Swasthya-Mitra/
│
├── docs/                         # Documentation, API docs, architecture diagrams
│
├── frontend/                     # React App (Vite or CRA)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/             # API calls (Axios)
│   │   ├── utils/
│   │   ├── store/                # Redux / Zustand
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/                      # Node + Express + MongoDB (MERN backend)
│   ├── src/
│   │   ├── config/               # DB config, environment variables
│   │   ├── models/               # Mongoose schemas
│   │   ├── controllers/          # Core business logic
│   │   ├── routes/               # Express routes
│   │   ├── middleware/           # Auth, rate-limiting, validation
│   │   ├── utils/                # Helper functions
│   │   ├── services/             # External services calls (AI service, SMS, WhatsApp)
│   │   ├── jobs/                 # Cron jobs (reminders etc.)
│   │   ├── sockets/              # WebSocket / Socket.IO (for live queue updates)
│   │   └── server.js             # App entry
│   ├── tests/
│   └── package.json
│
├── ai-services/                  # Python AI microservices
│   ├── prediction-service/       # AI wait time prediction model
│   │   ├── app.py                # FastAPI / Flask entry point
│   │   ├── model/                # ML models (.pkl / .onnx)
│   │   ├── src/
│   │   │   ├── preprocessing/
│   │   │   ├── utils/
│   │   │   ├── routers/
│   │   │   └── services/
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   ├── voice-service/            # Voice-based booking (speech → text)
│   │   ├── app.py
│   │   ├── src/
│   │   │   ├── stt/
│   │   │   └── utils/
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   ├── nlp-service/              # WhatsApp reminders / message classification
│   │   ├── app.py
│   │   ├── model/
│   │   └── requirements.txt
│   │
│   └── shared/                   # Shared scripts between services
│       ├── utils.py
│       ├── constants.py
│       └── data/
│
├── database/                     # DB scripts, backups and seeds
│   ├── seeds/
│   ├── migrations/
│   └── backup/
│
├── devops/                       # CI/CD, Deployment, Docker Compose, k8s
│   ├── docker/
│   ├── kubernetes/
│   ├── nginx/
│   └── ci-cd/
│
├── docker-compose.yml            # To run all services locally
├── .env.example                  # Example env file
└── README.md
