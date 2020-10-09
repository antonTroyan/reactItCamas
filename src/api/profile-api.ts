import {PhotosType, ProfileType} from "../types/types";
import {instance, ApiResponseType} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileApi = {

    downloadUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ApiResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        })
    },

    downloadUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`);
    },

    // Server knows which status to update using session.
    // According API we need to send json object with key - status.
    updateUserStatus(statusValue: string) {
        return instance.put<ApiResponseType>('profile/status', {
            status: statusValue
        }).then(response => {
            return response.data
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put<ApiResponseType>('profile', profile).then(response => response.data)
    }
};