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

let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
    username = promptForUsername();
    userStore.set(username);
}
let chatRoom;
while (!chatRoom) {
    chatRoom = promptForChatRoom();
}

class ChatApp {
    constructor() {
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, username);
        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
            if (messageStore.get()) {
                messageStore.get().forEach(msg => {
                    if (msg['chatRoom'] === chatRoom) {
                        this.chatList.drawMessage(msg);
                    }
                });
            }
            this.chatForm.init(data => {
                let message = new ChatMessage({
                    message: data,
                    chatRoom: chatRoom
                });
                socket.sendMessage(message.serialize());
            });
            let joinMsg = new ChatMessage({
                message: username + ' joined the chat.',
                chatRoom: chatRoom
            });
            socket.sendMessage(joinMsg.serialize());
            this.chatList.init();
        });
        socket.registerMessageHandler((data) => {
            let message = new ChatMessage(data);
            // if (message['chatRoom'] === chatRoom) {
                this.chatList.drawMessage(message.serialize());
            // }
            messageStore.set(message.serialize());
        });
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
