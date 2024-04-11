import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Card{
  id: string, 
  text: string
}


export interface List{
  title: string,
  id: string,
  cards: Card[]
}

interface Board {
  lists: List[]
}

const initialState: Board = {
  lists: [
  {title: "List 1", id: "1", cards: [] },
  {title: "List 2", id: "3", cards: [] },
  {title: "List 3", id: "5", cards: [] }]
}

export const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<{id: string, title: string}>) =>{
      state.lists.push({
        id: action.payload.id,
        title: action.payload.title,
        cards: []
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