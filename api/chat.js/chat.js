```javascript
// Neo Frontend Chat Script — Fixed Flash Issue

const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

// Function to add chat messages
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add(sender);
  msg.textContent = `${sender === "user" ? "You" : "Neo"}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle send button click
sendBtn.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    addMessage("bot", data.reply || "Hmm... something went wrong.");
  } catch (err) {
    console.error(err);
    addMessage("bot", "Error connecting to Neo 😔");
  }
});
```

