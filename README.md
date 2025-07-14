# 🛍️ SparkBridge Shop

A modern full-stack e-commerce web application with AI-powered product summaries, dynamic reviews, and a beautiful responsive UI.

---

## ✨ Features

- 🖼️ Product gallery
- 🔎 AI-generated smart summaries
- 🛒 Add to Cart & quantity control
- ❤️ Persistent product "like" state
- 🧠 AI Assistant with typing animation
- ✍️ Real-time customer reviews
- 📱 Fully responsive (mobile-first)
- ⚡ Built with performance and scalability in mind

---

## 🛠️ Tech Stack

| Layer         | Tech                                   |
| ------------- | -------------------------------------- |
| Frontend      | Next.js 14+, React 18, TailwindCSS     |
| Backend       | Express.js (Node.js)                   |
| Database      | PostgreSQL via Prisma ORM & Supbase    |
| LLM           | OpenAI API                             |

---

## 📂 Folder Structure

.
├── frontend/ # Frontend (Next.js)
│ ├── components/ # Shared UI components
│ ├── app/ # Next.js routing
│ └── styles/ # Global styles
├── backend/ # Backend (Express.js)
│ ├── routes/ # API route handlers
│ ├── controllers/ # Logic for routes
│ ├── prisma/ # Prisma schema & seed
│ └── middlewares/ # Auth, error handling, etc.
└── README.md


---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v18+
- PostgreSQL database
- Git

### 🔄 Clone the Repository

```bash
git clone https://github.com/AshkaanGiveki/sparkbridge.git
cd sparkbridge-shop

📦 Installation
1. Install client dependencies

cd frontend
npm install

2. Install server dependencies

cd ../backend
npm install

⚙️ Environment Variables

Create a .env file in both client and server directories:
✅ For frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:3030 ["Your Backend Server Address"]
API_BASE_URL=http://localhost:3030/api ["Your API Base URL Address"]


🧪 Run the App Locally
1. Generate the database

cd server
npx prisma migrate dev --name init
npx prisma generate


2. Start the frontend and backend app concurrently

cd ..
npm run dev

🧠 AI Assistant (TypingContent)

AI summaries are dynamically generated and typed word-by-word in a stylized container, with real-time bullet separation, bold formatting, and category grouping.

💬 Contact

Ashkan Giveki
GitHub: @AshkaanGiveki
Email: givekia@gmail.com