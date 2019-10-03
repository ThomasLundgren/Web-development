let socket;

function init(url) {
    socket = new WebSocket(url);
    console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
    socket.onopen = () => {
        console.log('open');
        handlerFunction();
    }
}

function registerMessageHandler(handlerFunction) {
    socket.onmessage = e => {
        console.log('Message: ' + e.data);
        try {
            let data = JSON.parse(e.data);
            handlerFunction(data);
        } catch (e) {
            console.log("Exception in registerMessageHandler: " + e);
            if (typeof data === "string") {
                handlerFunction(data);
            }
        }
    }
}

function sendMessage(payload) {
    console.log(payload);
    socket.send(JSON.stringify(payload));
}

export default {
    init,
    registerOpenHandler,
    registerMessageHandler,
    sendMessage
}
