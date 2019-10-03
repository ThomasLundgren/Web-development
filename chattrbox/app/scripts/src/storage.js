class Store {
    constructor(storageApi) {
        this.api = storageApi;
    }

    get() {
        return this.api.getItem(this.key);
    }

    set(value) {
        this.api.setItem(this.key, value);
    }
}

export class UserStore extends Store {
    constructor(key) {
        super(sessionStorage);
        this.key = key;
    }
}

export class MessageStore extends Store {
    constructor(key) {
        super(localStorage);
        this.key = key;
    }

    addMessage(message) {
        let messages = super.get() || "";
        console.log("MessageStore | object in localStorage: " + JSON.stringify(messages));
        let messagesStr = messages + JSON.stringify(message);
        console.log("MessageStore | object in localStorage: " + messagesStr);
        super.set(messagesStr);
    }

}
