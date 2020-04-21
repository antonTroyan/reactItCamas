const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: []
}

export const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            debugger
            return {
                ...state,
                users: [...state.users],
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, isFollowed: true };
                    }
                    return user;
                })
            }

        case UNFOLLOW:
            debugger
            return {
                ...state,
                users: [...state.users],
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, isFollowed: false };
                    }
                    return user;
                })
            }

        case SET_USERS: {
            return { ...state, users: [...state.users, ...action.users] };
        }

        default: return state;
    }
};

export const followActionCreator = (userId) => ({ type: FOLLOW, userId });
export const unfollowActionCreator = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersActionCreator = (users) => ({ type: SET_USERS, users });

export default usersReducer;