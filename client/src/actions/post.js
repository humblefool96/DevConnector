import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

//get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    //console.log(res);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    //console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    //console.log(res);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};