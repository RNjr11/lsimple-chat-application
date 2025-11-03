// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// ✅ Secure proxy endpoint for Giphy
app.get("/api/giphy/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing search query" });

  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${encodeURIComponent(
      query
    )}&limit=12&rating=g`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from Giphy:", err);
    res.status(500).json({ error: "Failed to fetch GIFs" });
  }
});

// ✅ WebSocket chat setup
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
