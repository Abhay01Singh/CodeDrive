🎓 EduHub

EduHub is an online coding learning platform where users can purchase courses, attend lectures, write & run code, and interact with mentors through chat. It provides a seamless learning experience with video streaming, live coding practice, secure payments, and real-time communication.

📌 Features

🛒 Course Purchase – Browse, purchase, and enroll in courses.

🎥 Video Lectures – Stream pre-recorded or uploaded course content.

💻 Code Editor – Practice coding directly in the browser (with compiler support).

💬 Mentor Chat – One-to-one or group chat with course mentors.

🔐 Authentication – Secure login & signup with JWT authentication.

💳 Payment Gateway – Integrates Stripe/Razorpay for safe payments.

📂 Course Management – Admin panel to upload courses, manage videos, and set prices.

📱 Responsive UI – Works on desktop, tablet, and mobile devices.

🛠️ Tech Stack
Frontend

React.js (Next.js optional)

TailwindCSS / ShadCN for UI

Axios for API calls

Monaco Editor / CodeMirror for in-browser coding

Backend

Node.js + Express

MongoDB + Mongoose

Multer/Cloudinary (for video & thumbnail upload)

JWT Authentication

Judge0 / custom compiler API for code execution

Other Integrations

WebSockets (Socket.IO) for real-time chat

Payment Gateway (Stripe/Razorpay)

Video Hosting/Streaming (Cloudinary / AWS S3)

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/yourusername/eduhub.git
cd eduhub

2️⃣ Install dependencies
# Backend
cd server
npm install

# Frontend
cd client
npm install

3️⃣ Environment Variables

Create .env files in both server/ and client/ with:

Backend (server/.env)

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
STRIPE_SECRET_KEY=your_stripe_key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com/submissions
JUDGE0_API_KEY=your_judge0_api_key


Frontend (client/.env)

REACT_APP_API_URL=http://localhost:5000/api

4️⃣ Run the app
# Backend
cd server
npm run dev

# Frontend
cd client
npm start

📸 Screenshots

(Add screenshots here once your UI is ready — e.g., homepage, course details, lecture player, code editor, chat screen.)

📂 Project Structure
eduhub/
│
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components (Navbar, Editor, Player)
│   │   ├── pages/        # Pages (Home, Courses, Lecture, Chat, CodeEditor)
│   │   ├── context/      # Auth & Global Context
│   │   └── utils/        # Helper functions
│
├── server/               # Node.js backend
│   ├── models/           # Mongoose models (Course, User, Chat, CodeSession)
│   ├── routes/           # Express routes (auth, courses, chat, code)
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, error handling
│   └── config/           # DB, Cloudinary, Stripe, Judge0 configs
│
└── README.md

🧑‍💻 Contributors

Your Name – Full Stack Developer

📜 License

This project is licensed under the MIT License – free to use and modify.
