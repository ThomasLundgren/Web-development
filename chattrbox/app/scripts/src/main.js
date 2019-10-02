/*
    BRONZE CHALLENGE: Default Import Name
    Answer: It works. The default export object can be named freely in the
    importing client code.
    The imported class ChatApp defined in app.js is ASSIGNED to the
    variable ApplicationForChatting. It is up to the client code to name the
    imported object(s).
    Imported objects CAN be referred to by their original name when importing
    but can then be assigned an alias.
*/
import ApplicationForChatting from './app';

new ApplicationForChatting();
