import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import boardSlice from './board/boardSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch