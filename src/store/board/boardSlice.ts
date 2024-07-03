import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {
  boards: [
    {
      title: "Amazing Board",
      id: "board_1",
      backgroundColor: "bg-gradient-to-r from-green-400 from-pink-500",
      lists: [
        "list_1","list_2","list_3"
      ]
    }
  ]
};



export const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<{boardId: string, boardTitle: string, backgroundColor: string}>) =>{
        state.boards.push({
          title: action.payload.boardTitle,
          id: action.payload.boardId,
          lists: [],
          backgroundColor: action.payload.backgroundColor
        })
    },

    removeBoard: (state, action: PayloadAction<{boardId: string}>)=>{
      state.boards.filter((board) => board.id !== action.payload.boardId )
    }
    }
})

// Action creators are generated for each case reducer function
export const { 
  addList, removeList, addBoard, 
  removeBoard, addCard, removeCard, 
  dragCard, dragCardSwap, dragListSwap, 
  changeListTitle, changeCardTitle, setDueDate,
  setLabel
} = BoardSlice.actions

export default BoardSlice.reducer