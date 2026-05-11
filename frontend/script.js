const session_id = Math.random().toString(36).substring(7);
const textarea = document.getElementById("message");

textarea.addEventListener("keydown", function (e) {
    // Enter without Shift → send message
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // stop new line
        sendMessage();
    }

    // Shift + Enter → allow new line (default behavior)
});

async function sendMessage() {
    const input = document.getElementById("message");
    const message = input.value;
    const chat = document.getElementById("chat");

    if (!message) return;

    // show user message
    chat.innerHTML += `<div class="message user">${message}</div>`;

    input.value = "";

    // typing indicator
    const typing = document.createElement("div");
    typing.className = "message bot";
    typing.innerText = "Searching...";
    chat.appendChild(typing);

    chat.scrollTop = chat.scrollHeight;

    const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message, session_id })
    });

    const data = await response.json();

    // remove typing
    typing.remove();

    // bot message
    chat.innerHTML += `<div class="message bot">${data.response}</div>`;

    chat.scrollTop = chat.scrollHeight;
}