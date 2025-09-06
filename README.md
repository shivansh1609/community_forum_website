2. Install Dependencies
Install dependencies for both backend and frontend:
npm install

3. Setup Environment Variables

Create a .env file in the root folder and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the Development Server

Start both backend and frontend using:

npm run dev

📂 Folder Structure
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
