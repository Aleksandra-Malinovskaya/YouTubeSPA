import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: { accept: "application/json", "Content-Type": "application/json" },
};

export const authRequest = createAsyncThunk(
  "reg/authRequest",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://todo-redev.herokuapp.com/api/auth/login",
        data,
        config
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", data.email);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.errors?.msg ||
          "Ошибка сервера"
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(authRequest.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(authRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
  selectors: {
    selectError: (state) => state.error,
    selectLoading: (state) => state.loading,
    selectSuccess: (state) => state.success,
  },
});

export const { resetAuthState } = AuthSlice.actions;
export const { selectError, selectLoading, selectSuccess } =
  AuthSlice.selectors;
export default AuthSlice.reducer;
