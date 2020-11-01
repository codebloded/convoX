const socket = io();
let name;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_box')
do{
    name= prompt("Enter the Name");
}while(!name);

textArea.addEventListener('keyup',(event)=>{
    if(event.key === "Enter"){
        sendMessage(event.target.value);
    }
});

function sendMessage(message){
    let msg = {
        user:name,
        message:message.trim()
    }
    //Append
    appendMessage(msg, 'outgoing');
    textArea.value=""
    scrollBottom()

    //send to server
    socket.emit("message", msg);
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let msgMarkup = ` <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = msgMarkup;
    messageArea.appendChild(mainDiv);


}

//Recieving msg

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollBottom()
})

function scrollBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}