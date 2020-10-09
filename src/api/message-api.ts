import {instance} from "./api";

export const messagesApi = {

    downloadMessages(userId: number) {
        return instance.get(`dialogs/${userId}/messages`);
    },

    sendMessage(userId: number, messageText: string) {
        return instance.post(`dialogs/${userId}/messages`, {
            body : messageText
        });
    },

    downloadFriends() {
        return instance.get(`dialogs`);
    }
};