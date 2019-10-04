const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
    port: port
});
const authMessages = [];
const unauthMessages = [];
const authUsers = new Set();
const unauthUsers = new Set();

const browserUsers = [];
// GOLD CHALLENGE: Chat Bot
const chatBot = require('./chatbot');
chatBot(ws);

ws.on('connection', (socket, req) => {
    console.log('Client connection established.');
    socket.on('message', data => {
        console.log("Websocket server | message received: " + data);
         if (isBrowserUser(data)) {
            let newUser = extractNewBrowserUser(req, data, socket);
            if (newUser) {
                browserUsers.push(newUser.serialize());
            }
            broadcastToUsersInChatRoom(data, getChatRoom(data));
        } else {
            // SILVER CHALLENGE: Speakeasy
            if (isSpeakeasyEntry(socket, data)) {
                // Password just entered: add user to speakeasy and send chat log
                addUserToSpeakeasy(socket);
                sendSpeakeasyChatLog(socket);
                if (unauthUsers.has(socket)) {
                    unauthUsers.remove(socket);
                }
            }
            if (authUsers.has(socket)) {
                // If the user has given the password, save and broadcast the message
                authMessages.push(data);
                broadcastToAuthUsers(data);
            } else {
                /*
                    Connected wscat users who haven't entered the password are talking amongst
                    themselves.
                */
                if (!unauthUsers.has(socket)) {
                    // New unauthorized user: add to list and send chat log
                    unauthUsers.add(socket);
                    sendUnauthChatLog(socket);
                }
                unauthMessages.push(data);
                unauthUsers.forEach(user => user.send(data));
            }
        }
    });
});

const isSpeakeasyEntry = (socket, data) => {
    return (data.includes('Swordfish') && !authUsers.has(socket))
};

const isBrowserUser = data => data.includes('chatRoom');

const addUserToSpeakeasy = socket => {
    authUsers.add(socket);
    socket.send("Access granted. Welcome to the speakeasy!");
};

const extractNewBrowserUser = (request, data, socket) => {
    // returns a user object if incoming message is from a new user, else return null
    let id = request.headers['sec-websocket-key'];
    let chatRoom = getChatRoom(data);
    let userObj = new User({
        id: id,
        socket: socket,
        chatRoom: chatRoom
    });
    let userAlreadyAdded = false;
    for (let i = 0; i < browserUsers.length; i++) {
        if (browserUsers[i].id === id) {
            userAlreadyAdded = true;
            break;
        }
    }
    if (userAlreadyAdded) {
        return null;
    } else {
        return userObj;
    }
}

const sendSpeakeasyChatLog = socket => authMessages.forEach(msg => socket.send(msg));

const sendUnauthChatLog = socket => unauthMessages.forEach(msg => socket.send(msg));

const broadcastToUsersInChatRoom = (data, chatRoom) => {
    browserUsers.forEach(storedUser => {
        if (storedUser['chatRoom'] === chatRoom) {
            storedUser['socket'].send(data);
        }
    });
}

const broadcastToAuthUsers = data => {
    ws.clients.forEach(clientSocket => {
        if (authUsers.has(clientSocket)) {
            clientSocket.send(data);
            /* <-- Comment this line and
                       uncomment for-loop below to run Bronze Challenge.
                       BRONZE CHALLENGE: Am I Repeating Myself?
                        for (i = 0; i < authMessages.length; i++) {
                            clientSocket.send(data);
                       }
                        */
        }
    });
};

const getChatRoom = (data) => JSON.parse(data)['chatRoom'];

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
