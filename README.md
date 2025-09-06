# 🌐 Community Forum Website

Welcome to the **Community Forum Website** — a platform where people can **connect, share ideas, post questions, comment, and collaborate**.  
It’s like a modern community-driven space where users can engage in meaningful conversations! 💬

---

## 🚀 Features
- 📝 **Create Posts** – Share your thoughts and ideas with the community.
- 💬 **Comment System** – Engage with others through comments on posts.
- 🔐 **User Authentication** – Secure sign-up and login functionality.
- 👤 **Profile Management** – Update and manage your profile information.
- 📱 **Responsive Design** – Works seamlessly on desktop, tablet, and mobile.
- ⚡ **Fast & Optimized** – Built with performance and scalability in mind.

---

## 🛠 Tech Stack

Here’s the complete **tech stack** that powers this project:

### **Frontend**
| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Building user interface |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Styling and responsive design |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | Type safety and clean code |

---

### **Backend**
| Technology | Purpose |
|------------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) | Backend runtime environment |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Server-side framework |
| ![Convex](https://img.shields.io/badge/Convex-FF6F61?style=for-the-badge&logoColor=white) | Real-time database & backend services |

---

### **Database**
| Technology | Purpose |
|------------|---------|
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | Storing posts, users, and comments |

---

### **Other Tools**
| Tool | Purpose |
|------|---------|
| ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) | Version control |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) | Code hosting and collaboration |
| ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) | API testing |
| ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) | Development environment |

---

## ⚙️ Getting Started

Follow these steps to run the project locally on your machine:

### **1. Clone the Repository**
```bash
git clone https://github.com/shivansh1609/community_forum_website.git
cd community_forum_website
2. Install Dependencies
Install dependencies for both backend and frontend:
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file in the root folder and add the following:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Run the Development Server
Start both backend and frontend using:

bash
Copy code
npm run dev
📂 Folder Structure
csharp
Copy code
community_forum_website/
│
├── src/
│   ├── components/      # UI components
│   ├── pages/           # Pages like Home, Login, Forum
│   ├── hooks/           # Custom hooks
│   └── styles/          # CSS and Tailwind files
│
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── controllers/     # Business logic
│
├── public/              # Static files
├── .gitignore           # Git ignore file
├── package.json         # Dependencies and scripts
└── README.md            # Documentation
🌟 Future Improvements
Here are some exciting features we plan to add:

🔔 Notifications – Real-time alerts for comments and replies.

❤️ Like & Follow System – Engage more with other users.

🌐 Multi-language Support – Make the platform accessible globally.

📊 Analytics Dashboard – For admins to track community growth.
