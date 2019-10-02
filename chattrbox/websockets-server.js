const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
    port: port
});
const messages = [];
const authUsers = new Set();
const nonAuthUsers = new Set();
// GOLD CHALLENGE: Chat Bot
const chatBot = require('./chatbot');
chatBot(ws);

ws.on('connection', socket => {
    console.log('Client connection established.');
    // SILVER CHALLENGE: Speakeasy
    socket.on('message', data => {
        console.log('Message received: ' + data);
        if (data === 'Swordfish' && !authUsers.has(socket)) {
            if (nonAuthUsers.has(socket)) {
                nonAuthUsers.delete(socket);
            }
            authUsers.add(socket);
            socket.send("Access granted. Welcome to the speakeasy!")
            messages.forEach(msg => socket.send(msg));
        }
        if (authUsers.has(socket)) {
            messages.push(data);

            ws.clients.forEach(clientSocket => {
                if (authUsers.has(clientSocket)) {
                    clientSocket.send(data); /* Comment this line before activating Bronze challenge
                    BRONZE CHALLENGE: Am I Repeating Myself?
                     for (i = 0; i < messages.length; i++) {
                         clientSocket.send(data);
                    }
                    Uncomment this for-loop to run Bronze Challenge. */
                }
            });
        } else {
            /*
                User who haven't entered the password are talking amongst
                themselves.
            */
            if (!nonAuthUsers.has(socket)) {
                nonAuthUsers.add(socket);
            }
            nonAuthUsers.forEach(user => user.send(data));
        }

    });
});
