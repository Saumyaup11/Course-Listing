// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice'; // Import the courses slice

const store = configureStore({
  reducer: {
    courses: coursesReducer, // Add courses slice to the store
  },
});

export default store;
