const socket = io();
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const allMessages = document.getElementById("messages");

const userId = Math.random().toString(36).substring(2, 10); // Random ID for each user

socket.on("message", ({ message, senderId }) => {
    const p = document.createElement("p");
    p.innerText = message;
    p.classList.add("message");
    p.classList.add(senderId === userId ? "self" : "other");
    allMessages.appendChild(p);
    allMessages.scrollTop = allMessages.scrollHeight;
});

sendBtn.addEventListener("click", () => {
    const message = messageInput.value;
    if (message.trim()) {
        socket.emit("user-message", { message, senderId: userId });
        messageInput.value = "";
    }
});