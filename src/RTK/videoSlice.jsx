import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getVideos = createAsyncThunk(
  "video/getVideos",
  async ({ text, result = 12, order = "relevance" }, thunkAPI) => {
    try {
      const SEARCH_LINK = import.meta.env.VITE_YOUTUBE_SEARCH_LINK;
      const response = await axios.get(SEARCH_LINK, {
        params: {
          part: "snippet",
          q: text,
          maxResults: result,
          type: "video",
          order: order,
          key: API_KEY,
        },
      });
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || "Произошла ошибка"
      );
    }
  }
);

export const getStatistics = createAsyncThunk(
  "video/getStatistics",
  async ({ id }, thunkAPI) => {
    try {
      const STATISTICS_LINK = import.meta.env.VITE_YOUTUBE_STATISTICS_LINK;
      const response = await axios.get(STATISTICS_LINK, {
        params: {
          part: "statistics, snippet",
          id: id,
          key: API_KEY,
        },
      });
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
  reducers: {
    clearVideos: (state) => {
      state.videoMas = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.fulfilled, (state, action) => {
        state.videoMas = action.payload;
        state.loading = false;
        if (state.videoMas.length === 0) {
          state.error = "По запросу видео не найдены";
        }
      })
      .addCase(getVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.videoMas = action.payload;
        state.loading = false;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
  selectors: {
    selectVideo: (state) => state.videoMas,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const { clearVideos } = videoSlice.actions;
export const { selectVideo, selectLoading, selectError } = videoSlice.selectors;
export default videoSlice.reducer;
