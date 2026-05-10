import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getVideos = createAsyncThunk(
  "video/getVideos",
  async ({ text, result = 12, order = "relevance" }, thunkAPI) => {
    try {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: text,
            maxResults: result,
            type: "video",
            order: order,
            key: API_KEY,
          },
        }
      );
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || "Произошла ошибка"
      );
    }
  }
);

const initialState = {
  videoMas: null,
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.fulfilled, (state, action) => {
        state.videoMas = action.payload;
        state.loading = false;
      })
      .addCase(getVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
  selectors: {
    selectVideo: (state) => state.videoMas,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const { selectVideo, selectLoading, selectError } = videoSlice.selectors;
export default videoSlice.reducer;
