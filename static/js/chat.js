function showMyMessage(message) {
        const divContainer = document.createElement('div');
        const divItem = document.createElement('div');
        const img = document.createElement('img');
        const p = document.createElement('p');
        
        // Set atributes for elements
        divContainer.setAttribute('class', 'chat self');
        divItem.setAttribute('class', 'user-photo');
        img.setAttribute('src', "/static/images/Toan.jpg");
        p.setAttribute('class', 'chat-mess');

        p.innerText = message;
        divItem.innerHTML = img.outerHTML;
        divContainer.innerHTML = divItem.outerHTML;
        divContainer.innerHTML += p.outerHTML;


        document.getElementById('chatlogs').append(divContainer)
}

function showFriendMessage(message) {
    const divContainer = document.createElement('div');
    const divItem = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');
    
    // Set atributes for elements
    divContainer.setAttribute('class', 'chat friend');
    divItem.setAttribute('class', 'user-photo');
    img.setAttribute('src', "/static/images/Thuyen.jpg");
    p.setAttribute('class', 'chat-mess');

    p.innerText = message;
    divItem.innerHTML = img.outerHTML;
    divContainer.innerHTML = divItem.outerHTML;
    divContainer.innerHTML += p.outerHTML;


    document.getElementById('chatlogs').append(divContainer)
}
function scrollDownChatWindow() {
    const chatWindow = document.getElementById('chatlogs');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    
    // Connect
    socket.on('connect', () => {
        socket.send('Hi bae <3');
    });
    
    // Send data by Enter when typing or click on button
    document.getElementById('send-message').onclick = () => {
        // Sent data
        contentMessage = document.getElementById('typing').value;
        socket.send(contentMessage);

        console.log('Sent: ' + contentMessage)
        // show new message
        showMyMessage(contentMessage);
        scrollDownChatWindow();
    };
    // document.getElementById('typing').setAttribute(onkeydown = (e) => {
    //     contentMessage = document.getElementById('typing').value;
    //     if ( (window.event ? event.keyCode : e.which) == 13) { 
    //         socket.send(contentMessage);
    //     }
    // })
    
    // Receiv and show message
    socket.on('message', data => {
        console.log('Receiv: ' + data);
        showFriendMessage(data);
        scrollDownChatWindow();
    });
})