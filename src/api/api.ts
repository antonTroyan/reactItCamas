import axios from "axios";
import {ProfileType, UserType} from "../types/types";

// {withCredentials : true} - need to allow server to send cookies cross servers
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '148c700a-9ca0-485a-a9ff-5c4af60c5ecb'
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesWithCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

// D = {} type equals to empty object
export type ApiResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}