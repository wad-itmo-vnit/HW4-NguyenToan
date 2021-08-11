const worker =  new XMLHttpRequest();

worker.onreadystatechange = () => {
    if (worker.readyState == 4 && worker.status ==200) {
        console.log('Recive: ' + worker.responseText);
        message = worker.responseText;
        showFriendMessage(message)
    }
}
function shortPolling() {
    worker.open('POST', '/short/chat');
    worker.send()
}

setInterval(shortPolling, 1000);