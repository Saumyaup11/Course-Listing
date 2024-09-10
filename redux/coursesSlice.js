// src/redux/coursesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API endpoint
const API_URL = 'https://66df2f5ade4426916ee3d014.mockapi.io/courses';

// Async action to fetch courses
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload; // Set selected course based on ID
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { selectCourse } = coursesSlice.actions; // Export the selectCourse action

export default coursesSlice.reducer;
