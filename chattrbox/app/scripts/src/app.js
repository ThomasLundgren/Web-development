import socket from './ws-client';
import {ChatForm, ChatList} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

class ChatApp {
    constructor() {
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, 'wonderwoman');
        console.log(this.chatList);

        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
            this.chatForm.init(data => {
                let message = new ChatMessage({message: data});
                console.log("Data in this.chatform.init: " + data);
                socket.sendMessage(message.serialize());
            });
        });
        socket.registerMessageHandler((data) => {
            console.log(data);
            let message = new ChatMessage(data);
            this.chatList.drawMessage(message.serialize());
        });
    }
}

class ChatMessage {
    constructor(data) {
        var {message: m, user: u = 'Batman', timestamp: t = (new Date()).getTime()} = data;
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
