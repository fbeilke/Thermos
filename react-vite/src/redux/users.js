const GET_SINGLE_USER = "usersReducer/GET_SINGLE_USER"

function getSingleUser(user) {
    return {
        type: GET_SINGLE_USER,
        user
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


const initialState = { users: null }

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_SINGLE_USER: {
            return {...state, singleUser: action.user}
        }
        default:
            return state;
    }
}
