🎓 EduHub

EduHub is an online coding learning platform where users can purchase courses, attend lectures, write & run code directly in the browser, and interact with mentors through chat.
It provides a seamless learning experience with video streaming, secure payments, real-time communication, and an in-browser coding playground.

📌 Features

🛒 Course Purchase – Browse, purchase, and enroll in courses.

🎥 Video Lectures – Stream pre-recorded or uploaded course content.

💻 In-Browser Code Editor – Write and run code inside the platform (powered by Judge0 API).

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

Monaco Editor (for in-browser coding)

Backend

Node.js + Express

MongoDB + Mongoose

Multer / Cloudinary (for video & thumbnail upload)

JWT Authentication

Other Integrations

WebSockets (Socket.IO) for real-time chat

Payment Gateway (Stripe / Razorpay)

Video Hosting/Streaming (Cloudinary / AWS S3)

Judge0 API (for executing code inside the browser)

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

Create .env files in both server/ and client/.

Backend (server/.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
STRIPE_SECRET_KEY=your_stripe_key
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

🖥️ Demo User Flow

👤 Sign Up / Log In – Create an account securely.

📚 Browse Courses – Explore categories & select a course.

💳 Purchase Course – Pay via Stripe/Razorpay.

🎥 Watch Lectures – Stream video content seamlessly.

💻 Practice Coding – Use the built-in code editor to write & run code instantly.

💬 Chat with Mentor – Get support from mentors in real-time.

📂 Project Structure
eduhub/
│
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components (NavBar, CodeEditor, etc.)
│   │   ├── pages/        # Pages (Home, Courses, Lecture, Chat)
│   │   ├── context/      # Auth & Global Context
│   │   └── utils/        # Helper functions
│
├── server/               # Node.js backend
│   ├── models/           # Mongoose models (Course, User, Chat, Enroll, etc.)
│   ├── routes/           # Express routes (course, enroll, user, code, etc.)
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, error handling
│   └── config/           # DB, Cloudinary, Stripe, Judge0 configs
│
└── README.md

🧑‍💻 Contributors

Your Name – Abhay Pratap Singh

📜 License

This project is licensed under the MIT License – free to use and modify.

👉 Now EduHub is not just for watching — students can learn, code, and practice all in one place.
