import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { baseUrl } from "../utils/baseUrl";

const initialState = {
  token: localStorage.getItem("token"),
  first_name: localStorage.getItem("first_name"),
  last_name: localStorage.getItem("last_name"),
  email: localStorage.getItem("email"),
  phone: localStorage.getItem("phone"),
  user_type: localStorage.getItem("user_type"),
  id: localStorage.getItem("id"),
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
      const { referral_code, ...body } = user;

      const endpoint = referral_code
        ? `${baseUrl}/v2/register?referral_code=${referral_code}`
        : `${baseUrl}/v2/register`;

      const response = await axios.post(endpoint, body);

      if (response.status === 200 || response.status === 201) {
        toast.success("Registration successful");
        return response.data;
      }
    } catch (err) {
      const res = err.response?.data;

      const backendError =
        res?.message?.error ||
        (res?.errors && Object.values(res.errors).flat().join(" ")) ||
        res?.error ||
        "Registration failed.";

      return rejectWithValue(backendError);
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
      localStorage.setItem("_id", userInfo.id);

      return { token: access_token, user: userInfo, user_type: user.user_type };
    } catch (err) {
      const res = err.response?.data;

      const backendError =
        res?.errors?.failed?.[0] || res?.message || "Login failed.";

      return rejectWithValue(backendError);
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
      localStorage.setItem("id", adminInfo.id);
      localStorage.setItem("user_type", "admin");

      return { token: access_token, user: adminInfo, user_type: "admin" };
    } catch (err) {
      const res = err.response?.data;

      const backendError =
        res?.errors?.failed?.[0] || res?.message || "Login failed.";

      return rejectWithValue(backendError);
    }
  }
);

export const loginPainter = createAsyncThunk(
  "auth/loginPainter",
  async (painter, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/v2/login`, painter);
      const { access_token, user: painterInfo } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("first_name", painterInfo.firstName);
      localStorage.setItem("last_name", painterInfo.lastName);
      localStorage.setItem("email", painterInfo.email);
      localStorage.setItem("id", painterInfo.id);
      localStorage.setItem("user_type", "admin");

      return { token: access_token, user: painterInfo, user_type: "painter" };
    } catch (err) {
      const res = err.response?.data;

      const backendError =
        res?.errors?.failed?.[0] || res?.message || "Login failed.";

      return rejectWithValue(backendError);
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
      .addCase(loginPainter.pending, (state) => {
        state.loading = true;
        state.loginStatus = "pending";
      })
      .addCase(loginPainter.fulfilled, (state, action) => {
        const { token, user, user_type } = action.payload;
        state.token = token;
        state.first_name = user.firstName;
        state.last_name = user.lastName;
        state.phone = user.phoneNum;
        state.email = user.email;
        state._id = user.id;
        state.user_type = user_type;
        state.loginStatus = "success";
        state.loading = false;
        state.success = true;
      })
      .addCase(loginPainter.rejected, (state, action) => {
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
