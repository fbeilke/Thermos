const GET_SINGLE_USER = "usersReducer/GET_SINGLE_USER"
const CLEAR_SINGLE_USER = "usersReducer/CLEAR_SINGLE_USER"
const GET_ALL_USERS = "usersReducer/GET_ALL_USERS"

function getSingleUser(user) {
    return {
        type: GET_SINGLE_USER,
        user
    }
}

export function clearSingleUser() {
    return {
        type: CLEAR_SINGLE_USER
    }
}

function getAllUsers(users) {
    return {
        type: GET_ALL_USERS,
        users
    }
}



export const getSingleUserThunk = (blogName) => async (dispatch) => {
    const response = await fetch(`/api/users/${blogName}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleUser(data))
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const getAllUsersThunk = () => async (dispatch) => {
    const response = await fetch('/api/users/')

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllUsers(data))
    } else {
        const errors = await response.json();
        return errors;
    }
}


const initialState = { users: null }

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_SINGLE_USER: {
            return {...state, singleUser: action.user}
        }
        case CLEAR_SINGLE_USER: {
            return {...state, singleUser: null}
        }
        case GET_ALL_USERS: {
            return {...state , allUsers: action.users}
        }
        default:
            return state;
    }
}
