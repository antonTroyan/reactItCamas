import * as axios from "axios";

// {withCredentials : true} - need to allow server to send cookies cross servers
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '148c700a-9ca0-485a-a9ff-5c4af60c5ecb'
    }
});

export const usersAPI = {

    getAllUsers(currentPage = 1, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    followSpecialUser(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    unFollowSpecialUser(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }
};

export const authApi = {

    amIAuthorized() {
        return instance.get(`auth/me`);
    },

    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe});
    },

    logout(email, password, rememberMe = false) {
        return instance.delete('auth/login');
    }
};

export const profileApi = {

    downloadUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    savePhoto(photoFile) {
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

    downloadUserStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },

    // server knows which status to update using session
    // according API we need to send json object with key - status
    updateUserStatus(statusValue) {
        return instance.put('profile/status',
            {status: statusValue}
        );
    },

    saveProfile(profile) {
        return instance.put('profile', profile)
    }
};