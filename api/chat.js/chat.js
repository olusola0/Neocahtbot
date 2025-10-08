```javascript
// Frontend Chat Script for Neo Chatbot

const chatBox = document.getElementById("chat-box");
const form = document.querySelector("form");
const input = document.querySelector("input");

// Function to add messages to chat
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add(sender);
  msg.textContent = `${sender === "user" ? "You" : "Neo"}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  addMessage("user", message);
  input.value = "";

  try {
    // Send to backend API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error("Network response failed");

    const data = await response.json();

    // Show bot reply
    if (data && data.reply) {
      addMessage("bot", data.reply);
    } else {
      addMessage("bot", "Hmm... I'm not sure what happened there 😅");
    }
  } catch (error) {
    console.error(error);
    addMessage("bot", "Oops, something went wrong. Please try again.");
  }
});
```

