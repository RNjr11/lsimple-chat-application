const ws = new WebSocket(`ws://${window.location.host}`);

const messagesDiv = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const gifContainer = document.getElementById("gifContainer");

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  const div = document.createElement("div");

  if (msg.type === "gif") {
    div.innerHTML = `<b>${msg.name}:</b><br><img src="${msg.url}" width="200" />`;
  } else {
    div.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
  }

  div.classList.add("message");
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// --- Name prompt (once per session)
// --- Check name or redirect
let username = localStorage.getItem("chatName");
if (!username) {
  window.location.href = "/name.html";
}

// --- Send text message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;

  const msg = { type: "text", name: username, text: input.value };
  ws.send(JSON.stringify(msg));
  input.value = "";
});

// --- Search and send GIF
searchBtn.addEventListener("click", async () => {
  const q = searchInput.value.trim();
  if (!q) return;

  gifContainer.innerHTML = "Loading...";

  const res = await fetch(`/api/giphy/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();

  gifContainer.innerHTML = "";

  data.data.forEach((gif) => {
    const img = document.createElement("img");
    img.src = gif.images.fixed_height.url;
    img.classList.add("gif-item");
    img.addEventListener("click", () => {
      const msg = { type: "gif", name: username, url: gif.images.fixed_height.url };
      ws.send(JSON.stringify(msg));
      gifContainer.innerHTML = "";
      searchInput.value = "";
    });
    gifContainer.appendChild(img);
  });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("chatName");
  window.location.href = "/name.html";
});
