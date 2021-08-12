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
document.getElementById('send-message').onclick = () => {
    const toSend = {"content" : document.getElementById('typing').value}
    const jsonString = JSON.stringify(toSend);
    if (toSend.content) {
        client.open('POST', '/chat', true);
        client.setRequestHeader('Content-Type', 'application/json');
        client.send(jsonString);

        console.log(jsonString);
        document.getElementById('typing').value = '';
        showMyMessage(toSend.content)
        scrollDownChatWindow()
    }
}