import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment';

function createGravatarUrl(username) {
    let userHash = md5(username);
    return `http://www.gravatar.com/avatar/${userHash.toString()}`;
}

export function promptForUsername() {
    let username = prompt('Enter a username');
    if (username) {
        return username.toLowerCase();
    } else {
        return null;
    }

}

export function promptForChatRoom() {
    let chatRoom = prompt('Which chat room would you like to join?');
    if (chatRoom) {
        return chatRoom.toLowerCase();
    } else {
        return null;
    }
}

export class ChatForm {
    constructor(formSel, inputSel) {
        this.$form = $(formSel);
        this.$input = $(inputSel);
    }

    init(submitCallback) {
        this.$form.submit(event => {
            event.preventDefault();
            let val = this.$input.val();
            console.log("Val: " + val);
            submitCallback(val);
            this.$input.val('');
        });
        this.$form.find('button').on('click', () => this.$form.submit());
    }
}

export class ChatList {
    constructor(listSel, username) {
        this.$list = $(listSel);
        this.username = username;
    }

    drawMessage({
        user: u,
        timestamp: t,
        message: m
    }) {
        let $messageRow = $('<li>', {
            'class': 'message-row'
        });

        if (this.username === u) {
            $messageRow.addClass('me');
        }

        let $message = $('<p>');

        $message.append($('<span>', {
            'class': 'message-username',
            text: u
        }));

        $message.append($('<span>', {
            'class': 'timestamp',
            'data-time': t,
            text: moment(t).fromNow()
        }));

        $message.append($('<span>', {
            'class': 'message-message',
            text: m
        }));

        let $img = $('<img>', {
            src: createGravatarUrl(u),
            title: u
        });

        $messageRow.append($img);
        $messageRow.append($message);
        // BRONZE CHALLENGE: Adding Visual Effects to Messages
        $messageRow.hide();
        $messageRow.fadeIn(800);
        $(this.$list).append($messageRow);
        $messageRow.get(0).scrollIntoView();
    }

    init() {
        this.timer = setInterval(() => {
            $('[data-time]').each((idx, element) => {
                let $element = $(element);
                let timestamp = new Date().setTime($element.attr('data-time'));
                let ago = moment(timestamp).fromNow();
                $element.html(ago);
            });
        }, 1000);
    }
}
