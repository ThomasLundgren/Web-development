const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
    port: port
});
const authMessages = [];
const authUsers = new Set();
const unauthUsers = new Set();

const webUsers = [];
// GOLD CHALLENGE: Chat Bot
const chatBot = require('./chatbot');
chatBot(ws);

ws.on('connection', (socket, req) => {
    console.log('Client connection established.');
    // SILVER CHALLENGE: Speakeasy
    socket.on('message', data => {
        console.log('Message received: ' + data);
        if (data.includes('Swordfish') && !authUsers.has(socket)) {
            authUsers.add(socket);
            socket.send("Access granted. Welcome to the speakeasy!")
            authMessages.forEach(msg => socket.send(msg));
        }
        if (authUsers.has(socket)) {
            authMessages.push(data);

            ws.clients.forEach(clientSocket => {
                if (authUsers.has(clientSocket)) {
                    clientSocket.send(data); /* Comment this line before activating Bronze challenge
                    BRONZE CHALLENGE: Am I Repeating Myself?
                     for (i = 0; i < authMessages.length; i++) {
                         clientSocket.send(data);
                    }
                    Uncomment this for-loop to run Bronze Challenge. */
                }
            });
        } else {
            try {
                // For browser users
                let id = req.headers['sec-websocket-key'];
                let chatRoom = JSON.parse(data)['chatRoom'];
                let userObj = new User({id: id, socket: socket, chatRoom: chatRoom});

                let userAlreadyAdded = false;
                for (let i = 0; i < webUsers.length; i++) {
                    if (webUsers[i].id === id) {
                        userAlreadyAdded = true;
                        break;
                    }
                }
                if (!userAlreadyAdded) {
                    webUsers.push(userObj.serialize());
                }
                webUsers.forEach(storedUser => {
                    if (storedUser['chatRoom'] === chatRoom) {
                        storedUser['socket'].send(data);
                    }
                });
            } catch (e) {
                /*
                    Connected wscat users who haven't entered the password are talking amongst
                    themselves.
                */
                console.log('websockets-server | Exception caught ');
                unauthUsers.add(socket);
                unauthUsers.forEach(user => user.send(data));
            }
            console.log("Websocket server | data: " + data);
        }
    });
});

class User {
    constructor({
        id: id,
        socket: socket,
        chatRoom: chatRoom
    }) {
        this.id = id;
        this.socket = socket;
        this.chatRoom = chatRoom;
    }

    serialize() {
        return {
            id: this.id,
            socket: this.socket,
            chatRoom: this.chatRoom
        };
    }
}
