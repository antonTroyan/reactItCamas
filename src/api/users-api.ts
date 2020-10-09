import {GetItemsType, instance} from "./api";


export const usersAPI = {

    getAllUsers(currentPage = 1, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    followSpecialUser(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    unFollowSpecialUser(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }
};