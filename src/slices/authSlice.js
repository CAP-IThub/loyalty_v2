import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance"; // use axios instance with interceptor
import { toast } from "react-hot-toast";
import { baseUrl } from "../utils/baseUrl";

const initialState = {
  token: localStorage.getItem("token"),
  first_name: localStorage.getItem("first_name"),
  last_name: localStorage.getItem("last_name"),
  email: localStorage.getItem("email"),
  phone: localStorage.getItem("phone"),
  user_type: localStorage.getItem("user_type"),
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  loading: false,
  userLoaded: false,
  success: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/register/`, user);
      if (response.status === 200) {
        toast.success("Registration successful");
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.email || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/users/login`, user);
      const { access_token, user: userInfo } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("first_name", userInfo.firstName);
      localStorage.setItem("last_name", userInfo.lastName);
      localStorage.setItem("email", userInfo.email);
      localStorage.setItem("phone", userInfo.phoneNum);
      localStorage.setItem("user_type", user.user_type);

      return { token: access_token, user: userInfo, user_type: user.user_type };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (admin, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/admins/login`, admin);
      const { access_token, user: adminInfo } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("first_name", adminInfo.firstName);
      localStorage.setItem("last_name", adminInfo.lastName);
      localStorage.setItem("email", adminInfo.email);
      localStorage.setItem("user_type", "admin");

      return { token: access_token, user: adminInfo, user_type: "admin" };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Admin login failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/request-password-reset/`, {
        email: user.email,
      });
      if (response.status === 200) {
        toast.success("Reset link sent to your email");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Reset failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state) {
      const token = localStorage.getItem("token");
      if (token) {
        return {
          ...state,
          token,
          first_name: localStorage.getItem("first_name"),
          last_name: localStorage.getItem("last_name"),
          email: localStorage.getItem("email"),
          phone: localStorage.getItem("phone"),
          user_type: localStorage.getItem("user_type"),
          userLoaded: true,
        };
      }
      return { ...state, userLoaded: true };
    },
    logoutUser(state) {
      localStorage.clear();
      return {
        ...initialState,
        token: null,
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerStatus = "pending";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerStatus = "success";
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerStatus = "rejected";
        state.registerError = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginStatus = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user, user_type } = action.payload;
        state.token = token;
        state.first_name = user.firstName;
        state.last_name = user.lastName;
        state.email = user.email;
        state.phone = user.phoneNum;
        state._id = user.id;
        state.user_type = user_type;
        state.loginStatus = "success";
        state.loading = false;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginStatus = "rejected";
        state.loginError = action.payload;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.loginStatus = "pending";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        const { token, user, user_type } = action.payload;
        state.token = token;
        state.first_name = user.firstName;
        state.last_name = user.lastName;
        state.email = user.email;
        state._id = user.id;
        state.user_type = user_type;
        state.loginStatus = "success";
        state.loading = false;
        state.success = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.loginStatus = "rejected";
        state.loginError = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.registerStatus = "pending";
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.registerStatus = "success";
        state.success = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.registerStatus = "rejected";
        state.registerError = action.payload;
      });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
