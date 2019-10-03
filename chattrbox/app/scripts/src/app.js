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
while (chatRoom !== 'chat1' && chatRoom !== 'chat2') {
    chatRoom = promptForChatRoom();
}

class ChatApp {
    constructor() {
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, username);
        // SILVER CHALLENGE
        if (messageStore.get()) {
            messageStore.get().forEach(msg => this.chatList.drawMessage(msg));
        }
        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
            this.chatForm.init(data => {
                let message = new ChatMessage({
                    message: data
                });
                socket.sendMessage(message.serialize());
            });
            this.chatList.init();
        });
        socket.registerMessageHandler((data) => {
            let message = new ChatMessage(data);
            this.chatList.drawMessage(message.serialize());
            // SILVER CHALLENGE
            messageStore.set(message.serialize());
        });
    }
}

class ChatMessage {
    constructor({
        message: m,
        user: u = username,
        timestamp: t = (new Date()).getTime()
    }) {
        this.message = m;
        this.user = u;
        this.timestamp = t;
    }

    serialize() {
        return {
            user: this.user,
            message: this.message,
            timestamp: this.timestamp
        };
    }

}
export default ChatApp;
