import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './board/boardSlice'
import listSlice from './list/listSlice'
import cardSlice from './card/cardSlice'

export const store = configureStore({
  reducer: {
    board: boardSlice,
    list: listSlice,
    card: cardSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch