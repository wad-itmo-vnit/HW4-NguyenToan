
const worker = new XMLHttpRequest();

worker.onreadystatechange = () => {
    if (worker.readyState == 4 && worker.status == 200) {
        resp = worker.responseText
        showFriendMessage(resp)
        console.log(resp)
        longPolling();
    }
}

function longPolling() {
    worker.open('POST', '/long/chat');
    worker.send()
}

worker.onerror = longPolling;
worker.ontimeout = longPolling;

longPolling();