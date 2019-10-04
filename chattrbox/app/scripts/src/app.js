import socket from './ws-client';
import {
    ChatForm,
    ChatList,
    promptForUsername,
    promptForChatRoom
} from './dom';
import {
    UserStore,
    MessageStore
} from './storage';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';
// SILVER CHALLENGE
const messageStore = new MessageStore('x-chattrbox/m');
const userStore = new UserStore('x-chattrbox/u');

let username = userStore.get();
let chatRoom;
if (!username) {
    username = promptForUsername();
    if (!username) {
        alert('You need to reload the page to reconnect.');
    } else {
        userStore.set(username);
    }
}

while (!chatRoom && username) {
    chatRoom = promptForChatRoom();
}

class ChatApp {
    constructor() {
        if (chatRoom && username) {
            this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
            this.chatList = new ChatList(LIST_SELECTOR, username);
            socket.init('ws://localhost:3001');
            socket.registerOpenHandler(() => {
                // Draw each message belonging to this chat room
                if (messageStore.get()) {
                    messageStore.get().forEach(msg => {
                        if (msg['chatRoom'] === chatRoom) {
                            let chatMsg = new ChatMessage(msg);
                            this.chatList.drawMessage(chatMsg);
                        }
                    });
                }
                // When submit button pressed: send message
                this.chatForm.init(data => {
                    let message = new ChatMessage({
                        message: data,
                        chatRoom: chatRoom
                    });
                    this.sendMessage(socket, message);
                });
                this.sendJoinMessage(socket);
                this.chatList.init();
            });
            socket.registerMessageHandler(data => {
                let message = new ChatMessage(data);
                this.chatList.drawMessage(message);
                messageStore.set(message.serialize());
            });
        }
    }

    sendJoinMessage(socket) {
        let joinMsg = new ChatMessage({
            message: username + ' joined the chat.',
            chatRoom: chatRoom
        });
        this.sendMessage(socket, joinMsg);
    }

    sendLeaveMessage(socket) {
        let leaveMsg = new ChatMessage({
            message: username + ' left the chat.',
            chatRoom: chatRoom
        });
        this.sendMessage(socket, leaveMsg);
    }

    sendMessage(socket, chatMessage) {
        socket.sendMessage(chatMessage.serialize());
    }
}

class ChatMessage {
    constructor({
        message: m,
        user: u = username,
        timestamp: t = (new Date()).getTime(),
        chatRoom: c
    }) {
        this.message = m;
        this.user = u;
        this.timestamp = t;
        this.chatRoom = c;
    }

    serialize() {
        return {
            user: this.user,
            message: this.message,
            timestamp: this.timestamp,
            chatRoom: this.chatRoom
        };
    }

}
export default ChatApp;
