import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/v1";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (name, thunkAPI) => {
    try {
      const { page } = thunkAPI.getState().posts;

      if (name) {
        const { title, tags } = name;
        const { data } = await axios.get(`/posts?&title=${title}&tags=${tags}`);
        return data;
      } else {
        const { data } = await axios.get(`/posts?page=${page}`);
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (name, thunkAPI) => {
    try {
      const { title, message, tags, selectedFile } = name.postData;
      const newPost = { title, message, tags };

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const { data } = await axios.post(`/posts/upload`, formData);
        newPost.selectedFile = data.image.src;
      } catch (error) {
        console.log(error);
      }
      const { data } = await axios.post(`/posts`, newPost);

      console.log(data);
      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/posts/${name.postData._id}`,
        name.postData
      );

      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.post(`posts/${name._id}/likePost`);

      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (name, thunkAPI) => {
    try {
      await axios.delete(url + `/posts/${name._id}`);
      return name._id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const displayAlert = createAsyncThunk(
  "posts/displayAlert",
  async (name, thunkAPI) => {
    try {
      setTimeout(() => {
        thunkAPI.dispatch(hideAlert());
      }, 2000);
      return "data";
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (name, thunkAPI) => {
    try {
      const { postId } = name;
      const { data } = await axios.get(`/posts/${postId}`);
      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  posts: [],
  isLoading: false,
  currentPost: null,
  numOfPages: 1,
  page: 1,
  alertText: "",
  alertType: "",
  showAlert: false,
  post: null,
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    hideAlert: (state, action) => {
      state.showAlert = false;
      state.alertText = "";
      state.alertType = "";
    },
    setCurrentPost: (state, action) => {
      state.currentPost = state.posts.filter(
        (post) => post._id === action.payload
      )[0];
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [displayAlert.fulfilled]: (state, action) => {
      state.showAlert = true;
      state.alertText = "Please provide all values!";
      state.alertType = "danger";
    },
    [getPosts.pending]: (state) => {
      state.isLoading = true;
      console.log("pending");
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.numOfPages = action.payload.numOfPages;
    },
    [getPosts.rejected]: (state) => {
      state.isLoading = false;
      console.log("rejected");
    },
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alertType = "success";
      state.alertText = "Post created!";
      state.posts = [...state.posts, action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    [likePost.pending]: (state) => {
      console.log("pending");
    },
    [likePost.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [likePost.rejected]: (state) => {
      console.log("fail");
    },
    [deletePost.pending]: (state) => {
      console.log("pending");
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    [deletePost.rejected]: (state) => {
      console.log("fail");
    },
    [getSinglePost.pending]: (state) => {
      state.isLoading = true;
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [getSinglePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.alertText = action.payload;
    },
  },
});

export const { setCurrentPost, changePage, hideAlert } = postsSlice.actions;

export default postsSlice.reducer;
