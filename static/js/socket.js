const socket = io();

socket.on('connect', () => {
    console.log('Connected!')
})

socket.on('message', (data) =>{
    console.log(data)
    showFriendMessage(data)
})

document.getElementById('send-message').onclick = () => {
    const toSend = {"content" : document.getElementById('typing').value}
    // const jsonString = JSON.stringify(toSend);
    if (toSend.content) {
        socket.send(toSend);
        console.log(toSend);
        document.getElementById('typing').value = '';
        showMyMessage(toSend.content)
        scrollDownChatWindow()
    }
}

