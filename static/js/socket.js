const socket = io();

socket.on('connect', () => {
    console.log('Connected!')
})

socket.on('message', (data) =>{
    console.log(data)
    showFriendMessage(data)
})

form.onsubmit = (data) => {
    data.preventDefault();
    data = new FormData(form)
    if (data.get('message')) {
        document.getElementById('typing').value = '';
        showMyMessage(data.get('message'));
        console.log(data.get('message'));
        socket.send(data.get('message'));
    }
}