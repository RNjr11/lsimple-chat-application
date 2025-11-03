# 💬 Simple WebSocket Chat App with Giphy Integration

A lightweight **real-time chat application** built using Node.js and native WebSocket — no Socket.IO required.

---

## 🚀 Features
- Real-time messaging between connected users  
- User must enter a name before joining chat  
- Supports sending **text messages**, **GIFs**, and **stickers**  
- Fetches GIFs from the **Giphy API**  
- Clean UI with message sender name shown  
- Backend built using Node.js `ws` library  

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, `ws` (WebSocket)  
- **GIF API:** Giphy Developers API  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/RNjr11/lsimple-chat-application.git
cd lsimple-chat-application


npm install

Create a .env file in the root directory with your Giphy API key:
GIPHY_API_KEY=your_api_key_here

Start the server
node server.js


Server will start

Open the app in your browser.

Enter your name on the welcome screen.

Start chatting — text and GIFs supported!

All users see messages instantly in real-time.

Folder Structure 

ws-chat/
├── server.js           # WebSocket backend server
├── public/
│   ├── index.html      # Chat UI
│   ├── script.js       # Frontend logic
│   └── styles.css      # Styling
├── .env                # Environment variables (not committed)
├── .gitignore
└── README.md


👨‍💻 Author

Rahul Chakraborty (RNjr11)
📫 rhcakraborty90@gmail.com

🌐 github.com/RNjr11


