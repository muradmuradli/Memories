import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/v1";

export const login = createAsyncThunk("auth/login", async (name, thunkAPI) => {
  try {
    const { userData, navigate } = name;
    const { data } = await axios.post("/auth/login", { ...userData });

    // navigate here
    setTimeout(() => {
      if (data) {
        navigate("/");
      }
    }, 2000);

    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.delete("/auth/logout");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (name, thunkAPI) => {
    try {
      const {
        navigate,
        userData: { firstName, lastName, email, password },
      } = name;
      const newUser = {
        name: firstName + " " + lastName,
        email: email,
        password: password,
      };

      const { data } = await axios.post(`/auth/register`, newUser);

      navigate("/info", { state: { text: data.msg } });

      return data.msg;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (name, thunkAPI) => {
    try {
      const { email, navigate } = name;
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/forgot-password",
        {
          email,
        }
      );

      navigate("/info", { state: { text: data.msg } });
      console.log(data);

      return data.msg;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const alert = createAsyncThunk("auth/alert", async (name, thunkAPI) => {
  try {
    thunkAPI.dispatch(displayAlert());
    setTimeout(() => {
      thunkAPI.dispatch(hideAlert());
    }, 2000);
    return "data";
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (name, thunkAPI) => {
    try {
      const { password, token, email, navigate } = name;
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/reset-password",
        {
          password,
          token,
          email,
        }
      );
      console.log(data);

      setTimeout(() => {
        navigate("/auth");
      }, 2000);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  name: "",
  userId: "",
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    displayAlert: (state, action) => {
      state.showAlert = true;
    },
    hideAlert: (state, action) => {
      state.showAlert = false;
      state.alertText = "";
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.authData = action.payload;
    },
    [register.rejected]: (state) => {
      state.authData = null;
      state.isLoading = false;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.showAlert = true;
      state.alertText = "Login successfull! Redirecting...";
      state.alertType = "info";
      state.isLoading = false;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
    },
    [login.rejected]: (state, action) => {
      state.showAlert = true;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
      state.isLoading = false;
      state.name = "";
      state.userId = "";
    },
    [logout.pending]: (state) => {
      console.log("pending");
    },
    [logout.fulfilled]: (state, action) => {
      state.name = "";
      state.userId = "";
    },
    [logout.rejected]: (state, action) => {
      console.log("failiure");
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload;
      state.alertType = "danger";
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload;
      state.alertType = "danger";
    },
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload;
      state.alertType = "danger";
    },
    [forgotPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload;
      state.alertType = "danger";
    },
  },
});

export const { showAlert, hideAlert, displayAlert } = authSlice.actions;

export default authSlice.reducer;
