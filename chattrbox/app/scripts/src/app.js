import socket from './ws-client';
import {ChatForm, ChatList, promptForUsername} from './dom';
import {UserStore, MessageStore} from './storage';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

const messageStore = new MessageStore('x-chattrbox/u');

let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
    username = promptForUsername();
    userStore.set(username);
}

class ChatApp {
    constructor() {
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, username);
        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
            if (messageStore.get()) {
                messageStore.get().forEach(msg => {
                    socket.sendMessage(msg);
                });
            }
            this.chatForm.init(data => {
                let message = new ChatMessage({message: data});
                console.log("Data in this.chatform.init: " + data);
                socket.sendMessage(message.serialize());
            });
            this.chatList.init();
        });
        socket.registerMessageHandler((data) => {
            let message = new ChatMessage(data);
            this.chatList.drawMessage(message.serialize());
            messageStore.set(message.serialize());
        });
    }
}

class ChatMessage {
    constructor(data) {
        var {message: m, user: u = username, timestamp: t = (new Date()).getTime()} = data;
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
