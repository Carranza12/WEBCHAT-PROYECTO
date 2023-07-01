
const socket = io();


const getCookieValue = (cookieName) => {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith(cookieName + "="));
    return cookie ? cookie.split("=")[1] : null;
};


const formatFecha = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear();
    let horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const am_pm = horas >= 12 ? 'PM' : 'AM';
  
    horas = horas % 12 || 12;
    const horaFormateada = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0');
  
    return `${dia}/${mes}/${anio} ${horaFormateada} ${am_pm}`;
  };

let messageInput = document.getElementById("messageInput");
const allMessages = document.getElementById("allMessages");
const username = getCookieValue("username");




messagesDatabase.forEach((item) => {
    const message_container = document.createElement("div");
    message_container.id = "message";
    message_container.className = "message_container";
    message_container.innerHTML = `
    <p class="p_username">${item.username} <span>${item.time}</span></p>
    <p class="p_message">${item.message}</p>
    `;
    allMessages.append(message_container);
})


socket.emit("user connected", username);


messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (messageInput.value) {
            const message = messageInput.value;
            const time = formatFecha();
            socket.emit("message", {
                username,
                message,
                time 
            });
            messageInput.value = ''
        }

    }
});

socket.on("message", data => {
    const message_container = document.createElement("div");
    message_container.id = "message";
    message_container.className = "message_container";
    message_container.innerHTML = `
    <p class="p_username">${data.username} <span>${data.time}</span></p>
    <p class="p_message">${data.message}</p>
    `;
    allMessages.append(message_container);
})

socket.on("user join", message => {
    const message_container = document.createElement("div");
    message_container.id = "message";
    message_container.className = "message_container";
    message_container.innerHTML = `
    <p class="p_message">${message}</p>
    `;
    allMessages.append(message_container);
})
