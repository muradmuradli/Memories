import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (name, thunkAPI) => {
    try {
      const { postId, message } = name;
      const { data } = await axios.post(`/posts/comments/${postId}`, {
        message,
      });
      return data.comment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async (name, thunkAPI) => {
    try {
      const { postId } = name;
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data.comments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (name, thunkAPI) => {
    try {
      try {
        const { postId, commentId } = name;
        await axios.delete(`/posts/comments/${postId}/${commentId}`);
        return commentId;
      } catch (error) {
        console.log(error.response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteReply = createAsyncThunk(
  "comments/deleteReply",
  async (name, thunkAPI) => {
    try {
      const { commentId, replyId } = name;
      console.log(replyId);
      try {
        await axios.delete(
          `/posts/comments/${commentId}/${replyId}/deleteComment`
        );
      } catch (error) {
        console.log(error.response);
      }
      return { commentId, replyId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const replyToComment = createAsyncThunk(
  "comments/replyToComment",
  async (name, thunkAPI) => {
    try {
      const { postId, commentId, reply } = name;
      const { data } = await axios.post(
        `/posts/comments/${postId}/${commentId}`,
        { message: reply }
      );
      return data.comment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (name, thunkAPI) => {
    try {
      const { commentId, _id } = name;
      if (!commentId) {
        const { data } = await axios.patch(
          `/posts/comments/${_id}/likeComment`
        );
        return data.comment;
      } else {
        const { data } = await axios.patch(
          `/posts/comments/${commentId}/${_id}/likeComment`
        );
        return data.comment;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  comments: [],
  isLoading: false,
  alertText: "",
  alertType: "",
  showAlert: false,
  replies: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.isLoading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alertType = "success";
      state.alertText = "Post created!";
      state.comments = [action.payload, ...state.comments];
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    [likeComment.pending]: (state) => {
      console.log("pending");
    },
    [likeComment.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.comments = state.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    [likeComment.rejected]: (state) => {
      console.log("fail");
    },
    [replyToComment.pending]: (state) => {
      state.isLoading = true;
    },
    [replyToComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alertType = "success";
      state.alertText = "Post created!";
      state.comments = state.comments.map((comment) =>
        comment._id !== action.payload._id ? comment : action.payload
      );
    },
    [replyToComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    [getAllComments.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alertType = "success";
      state.alertText = "Post created!";
      state.comments = action.payload;
    },
    [getAllComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    [deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alertType = "success";
      state.alertText = "Post created!";
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
    [deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    [deleteReply.pending]: (state) => {
      state.isLoading = true;
      console.log("delete reply pending");
    },
    [deleteReply.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alertType = "success";
      state.alertText = "Post created!";
      const newComment = state.comments.find(
        (comment) => comment._id === action.payload.commentId
      );
      newComment.responses = newComment.responses.filter(
        (response) => response._id !== action.payload.replyId
      );
      state.comments = state.comments.map((comment) =>
        comment._id !== newComment._id ? comment : newComment
      );
      console.log("delete reply success");
    },
    [deleteReply.rejected]: (state, action) => {
      state.isLoading = false;
      // state.alertText = action.payload.msg;
      state.alertType = "danger";
      console.log("delete reply failure");
    },
  },
});

export default commentSlice.reducer;
