import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './slices/articleSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
  },
})