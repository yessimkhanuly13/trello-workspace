import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface List{
  title: string,
  id: string,
  order: number
}

interface Board {
  lists: List[]
}

const initialState: Board = {
  lists: [
  {title: "Board 1", id: "1", order: 1 },
  {title: "Board 2", id: "3", order: 2 },
  {title: "Board 3", id: "5", order: 3 }]
}

export const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<{id: string, title: string}>) =>{
      state.lists.push({
        id: action.payload.id,
        title: action.payload.title,
        order: 0
      })
    },
    deleteBoard: (state, action:  PayloadAction<{id: string}>) =>{
      console.log(action.payload)
      state.lists = state.lists.filter((list)=> list.id !== action.payload.id )
    }
  },
})

// Action creators are generated for each case reducer function
export const { addBoard, deleteBoard } = BoardSlice.actions

export default BoardSlice.reducer