import * as axios from "axios";

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

    authorizeMe() {
        return instance.get(`auth/me`)
    }
};

export const profileApi = {

    downloadUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
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
    }
};