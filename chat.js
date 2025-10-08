document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (message === "") return;

  const chatBox = document.getElementById("chat-box");
  const userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);

  input.value = "";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = data.reply || "Error: No response from server.";
  chatBox.appendChild(botMessage);
});
