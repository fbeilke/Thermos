const GET_ALL_REBLOGS = 'reblogsReducer/GET_ALL_REBLOGS';
const DELETE_REBLOG = 'reblogsReducer/DELETE_REBLOG'

function getAllReblogs(reblogs) {
    return {
        type: GET_ALL_REBLOGS,
        reblogs
    }
}

function deleteReblog(postId) {
    return {
        type: DELETE_REBLOG,
        postId
    }
}

export const getAllReblogsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reblogs/')

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllReblogs(data))
    } else {
        const errors = await response.json();
        return errors
    }
}

export const reblogAsIsThunk = (post) => async () => {
    const response = await fetch(`/api/reblogs/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    })

    if (!response.ok) {
        const errors = await response.json();
        return errors;
    }
}

export const deleteReblogThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/reblogs/${postId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteReblog(postId))
    } else {
        const errors = await response.json();
        return errors;
    }
}

const initialState = { reblogs: null }

export default function reblogsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_REBLOGS: {
            return {...state, reblogs: action.reblogs}
        }
        case DELETE_REBLOG: {
            const newReblogs = {...state.reblogs}
            delete newReblogs[action.postId]
            return {...state, reblogs: newReblogs}
        }
        default:
            return state;
    }
}
