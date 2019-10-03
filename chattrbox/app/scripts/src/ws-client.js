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
        let data = e.data;
        try {
            data = JSON.parse(e.data);
        } catch(e) {
            console.log("SyntaxError in registerMessageHandler: " + e.data);
            data = e.data;
        }
        handlerFunction(data);
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
