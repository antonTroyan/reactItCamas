import axios from "axios";
import {ProfileType} from "../types/types";

// {withCredentials : true} - need to allow server to send cookies cross servers
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '148c700a-9ca0-485a-a9ff-5c4af60c5ecb'
    }
});

export const usersAPI = {

    getAllUsers(currentPage = 1, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    followSpecialUser(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    unFollowSpecialUser(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesWithCaptchaEnum {
    CaptchaIsRequired = 10
}


// We declared dataMeType inside MeResponseType directly
// Alternative declaration way
type MeResponseType = {
    data : {
        id : number,
        email : string
        login : string
    }
    resultCode : ResultCodesEnum
    messages : Array<string>
}

type LoginResponseType = {
    data : {
        userId : number
    }
    resultCode : ResultCodesEnum | ResultCodesWithCaptchaEnum
    messages : Array<string>
}

export const authApi = {

    amIAuthorized() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data);
    },

    logout() {
        return instance.delete('auth/login');
    }
};

export const profileApi = {

    downloadUserProfile(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        })
    },

    downloadUserStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },

    // Server knows which status to update using session.
    // According API we need to send json object with key - status.
    updateUserStatus(statusValue: string) {
        return instance.put('profile/status',
            {status: statusValue}
        );
    },

    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile)
    }
};

export const securityApi = {

    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
};

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