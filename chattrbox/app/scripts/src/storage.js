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
// SILVER CHALLENGE
export class MessageStore extends Store {
    constructor(key) {
        super(localStorage);
        this.key = key;
        this.numMessages = 0;
    }

    set(message) {
        let messages = JSON.parse(super.get()) || [];
        messages.push(message);
        super.set(JSON.stringify(messages));
    }

    get() {
        return JSON.parse(super.get());
    }

}
