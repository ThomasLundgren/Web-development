const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
    port: port
});
const messages = [];
const authUsers = new Set();
// GOLD CHALLENGE: Chat Bot
const chatBot = require('./chatbot');
chatBot(ws);

ws.on('connection', socket => {
    console.log('Client connection established.');
    // SILVER CHALLENGE: Speakeasy
    socket.on('message', data => {
        console.log('Message received: ' + data);
        if (data === 'Swordfish') {
            authUsers.add(socket);
            socket.send("Access granted. Welcome to the speakeasy!")
        }
        if (authUsers.has(socket)) {
            messages.forEach(msg => socket.send(msg));
            messages.push(data);

            ws.clients.forEach(clientSocket => {
                if (authUsers.has(clientSocket)) {
                    clientSocket.send(data); /* Comment this line before
                    activating Bronze challenge
                    BRONZE CHALLENGE: Am I Repeating Myself?
                     for (i = 0; i < messages.length; i++) {
                         clientSocket.send(data);
                    }
                    Uncomment this for-loop to run Bronze Challenge. */
                }
            });
        } else {
            socket.send("Hmm... There is something fishy going on here. Something swordy, too...");
        }

    });
});
