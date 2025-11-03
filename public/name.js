const input = document.getElementById("username");
const button = document.getElementById("enterChat");

button.addEventListener("click", () => {
  const name = input.value.trim();
  if (!name) return alert("Please enter your name!");

  localStorage.setItem("chatName", name);
  window.location.href = "/"; // redirect to main chat
});
