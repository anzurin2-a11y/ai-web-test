const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

const AI_AVATAR = "/static/focalors.png";
const USER_AVATAR = "/static/user.png";

function addBotMessage(text) {
  chatBox.innerHTML += `
    <div class="message bot">
      <img class="avatar" src="${AI_AVATAR}">
      <div class="bubble">${text}</div>
    </div>
  `;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addUserMessage(text) {
  chatBox.innerHTML += `
    <div class="message user">
      <div class="bubble">${text}</div>
      <img class="avatar" src="${USER_AVATAR}">
    </div>
  `;
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();
  addBotMessage(data.reply);
}

// Pesan awal
addBotMessage("Hydro Archon siap melayanimu.");
