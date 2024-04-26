const GET_ALL_POSTS = "postsReducer/GET_ALL_POSTS"
const CREATE_POST = "postsReducer/CREATE_POST"
const DELETE_POST = "postsReducer/DELETE_POST"


function getAllPosts(posts) {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

function createPost(post) {
    return {
        type: CREATE_POST,
        post
    }
}

function deletePost(postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export const getAllPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts/')
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllPosts(data));

    } else {
        return {errors: "There was an error."}
    }
}

export const createTextPostThunk = (post) => async (dispatch) => {
    const response = await fetch('/api/posts/text', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createPost(data))
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deletePost(postId))
    } else {
        const errors = await response.json();
        return errors;
    }
}

const initialState = { posts: null }

export default function postsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_POSTS: {
            return {...state, posts: action.posts}
        }
        case CREATE_POST: {
            const newPosts = {...state.posts}
            newPosts[action.post.id] = action.post
            return {...state, posts: newPosts}
        }
        case DELETE_POST: {
            const newPosts = {...state.posts}
            delete newPosts[action.postId]
            return {...state, posts: newPosts}
        }
        default:
            return state;
    }
}
