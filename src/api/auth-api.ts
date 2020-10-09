import {instance, ApiResponseType, ResultCodesEnum, ResultCodesWithCaptchaEnum} from "./api";

type MeResponseDataType = {
    id: number,
    email: string
    login: string
}

type LoginResponseType = {
    userId: number
}

export const authApi = {

    amIAuthorized() {
        return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`).then(response => response.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ApiResponseType<LoginResponseType, ResultCodesEnum | ResultCodesWithCaptchaEnum>>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data);
    },

    logout() {
        return instance.delete('auth/login');
    }
};