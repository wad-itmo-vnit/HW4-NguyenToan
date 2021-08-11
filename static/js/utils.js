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
    scrollDownChatWindow();
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
scrollDownChatWindow();

}
function scrollDownChatWindow() {
const chatWindow = document.getElementById('chatlogs');
chatWindow.scrollTop = chatWindow.scrollHeight;
}

const client = new XMLHttpRequest();

// Callbacks functions
client.onreadystatechange = () => {
    if (client.readyState == 4 && client.status == 200) {
        message = client.responseText;
        console.log('Recive: ' + message);
        showFriendMessage(message);
    }
}

// Send message to server
const form = document.getElementById('chat-form');
form.onsubmit = (e) => {
    e.preventDefault();
    data = new FormData(form);
    if (data.get('message')) {
        document.getElementById('typing').value = '';
        showMyMessage(data.get('message'))
        console.log('Send: ' + data.get('message'));
        client.open('POST', '/chat');
        client.send(data);
    }
}

