// GOLD CHALLENGE: Chat bot
const WebSocket = require('ws');
const name = 'Chat Bot Charlie: ';
var auth = false;
const qAndAMap = {
    'age': "I'm 3500 years old",
    'height': "I'm 2 nanometers tall, a rather distinguished height for a bot like me",
    'favfood': "I salivate (oilyvate, rather) at the thought of oil-drenched spaghetti with grease balls"
};
const connectedUsers = new Set();

const connectChatBot = server => {
    const socket = new WebSocket('http://localhost:' + server.address()['port']);
    console.log('Charlie connected.');
    server.on('connection', connSocket => {
        connSocket.on('message', msg => {
            parseMessage(msg, socket, connSocket);
        });
    });
};

const parseMessage = (msg, socket, connSocket) => {
    /*
        The chat bot will only talk to users who have entered the password.
    */
    if (msg === 'Swordfish') {
        if (!auth) {
            socket.send('Swordfish');
            auth = true;
        }
        if (!connectedUsers.has(connSocket)) {
            connSocket.send(getInfoMessage());
            connectedUsers.add(connSocket);
        }
    }
    if (msg.includes('@Charlie')) {
        if (msg.includes('-q')) {
            connectedUsers.forEach(user => user.send(getCmdList()));
        } else if (msg.includes('-')) {
            let index = msg.indexOf('-') + 1;
            connectedUsers.forEach(user => user.send(qAndAMap[msg.substring(index)]));
        }
    }
}

const getInfoMessage = () => {
    return "Hi! I'm Chat Bot Charlie!\n"
        + "Address me with @Charlie. To see a list of questions that i might "
        + "be able to answer, type @Charlie -q";
};

const getCmdList = () => {
    return "questions:\n"
        + "-age\n-height\n-favfood";
}

module.exports = connectChatBot;
