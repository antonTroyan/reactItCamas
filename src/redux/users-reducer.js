const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

let initialState = {
    users: [] ,
    pageSize: 50,
    totalUsersCount: 40,
    currentPage: 1,
    isFetching: false
};

export const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            debugger
            return {
                ...state,

                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true };
                    }
                    return user;
                })
            };

        case UNFOLLOW:
            debugger
            return {
                ...state,

                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false };
                    }
                    return user;
                })
            };

        case SET_USERS: {
            return { ...state, users: action.users };
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage : action.pageNumber
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.totalCount };
        }

        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetchingValue };
        }

        default: return state;
    }
};

export const followActionCreator = (userId) => ({ type: FOLLOW, userId });
export const unfollowActionCreator = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersActionCreator = (users) => ({ type: SET_USERS, users });
export const setCurrentPageActionCreator = (pageNumber) => ({ type: SET_CURRENT_PAGE, pageNumber });
export const setUsersTotalCountActionCreator = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount });
export const setIsFetchingActionCreator = (isFetchingValue) => ({ type: SET_IS_FETCHING, isFetchingValue });

export default usersReducer;