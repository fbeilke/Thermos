const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: user
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

export const followBlogThunk = (userId) => async(dispatch) => {
  try {
      const response = await fetch(`/api/follows/${userId}`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(userId)
      })

      if (response.ok) {
        dispatch(thunkAuthenticate())
      }

  } catch (err) {
      alert(err)
  }
}

export const unfollowBlogThunk = (userId) => async(dispatch) => {
  try {
      const response = await fetch(`/api/follows/${userId}`, {
          method: "DELETE"
      })

      if (response.ok) {
        dispatch(thunkAuthenticate())
      }

  } catch (err) {
      alert
  }
}

export const likePostThunk = (postId) => async(dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postId)
  })

  if (response.ok) {
    dispatch(thunkAuthenticate())
  }
}

export const unlikePostThunk = (postId) => async(dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(thunkAuthenticate())
  }
}

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
