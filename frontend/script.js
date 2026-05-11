const session_id = Math.random().toString(36).substring(7);

const textarea = document.getElementById("message");

textarea.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }

});

async function sendMessage() {

    const input = document.getElementById("message");
    const message = input.value.trim();
    const chat = document.getElementById("chat");

    if (!message) return;

    // user message
    chat.innerHTML += `
        <div class="message user">
            ${message}
        </div>
    `;

    input.value = "";

    // typing
    const typing = document.createElement("div");
    typing.className = "message bot";
    typing.innerText = "Thinking...";
    chat.appendChild(typing);

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch(
            "https://ai-chatbot-irf8.onrender.com/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    session_id
                })
            }
        );

        const data = await response.json();

        typing.remove();

        chat.innerHTML += `
            <div class="message bot">
                ${data.response}
            </div>
        `;

    } catch (error) {

        typing.remove();

        chat.innerHTML += `
            <div class="message bot">
                Error connecting to backend
            </div>
        `;

        console.error(error);
    }

    chat.scrollTop = chat.scrollHeight;
}