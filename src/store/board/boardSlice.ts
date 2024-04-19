import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Cards{
  id: string, 
  text: string
}

export interface List{
  title: string,
  id: string,
  cards: Cards[]
}

interface Board {
  lists: List[], 
  title: string,
  id: string
}

interface Boards {
  boards: Board[]
}

const initialState: Boards = {
  boards: [
    {
      lists: [
        {title: "List 1", id: "1", cards: [
          {
            id: "1",
            text: "List 1: text 1",
          },
          {
            id: "3",
            text: "List 1: text 2"
          },
          {
            id: "2",
            text: "List 1: text 3"
          },
          {
            id: "4",
            text: "List 1: text 4"
          }
        ] },
        {title: "List 2", id: "3", cards: [
          {
            id: "1",
            text: "List 2: text 1",
          },
          {
            id: "3",
            text: "List 2: text 2"
          },
          {
            id: "2",
            text: "List 2: text 3"
          },
          {
            id: "4",
            text: "List 2: text 4"
          }
        ] },
        {title: "List 3", id: "5", cards: [
          {
            id: "1",
            text: "List 3: text 1",
          },
          {
            id: "3",
            text: "List 3: text 2"
          },
          {
            id: "2",
            text: "List 3: text 3"
          },
          {
            id: "4",
            text: "List 3: text 4"
          }
        ] }],
        title: "Board 1",
        id: "1"
      }
  ]
}

export const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<{boardId: string, boardTitle: string, lists: List[]}>) =>{
        state.boards.push({
          title: action.payload.boardTitle,
          id: action.payload.boardId,
          lists: []
        })
    },

    removeBoard: (state, action: PayloadAction<{boardId: string}>)=>{
      state.boards.filter((board) => board.id !== action.payload.boardId )
    },

    addList: (state, action: PayloadAction<{boardId: string, listId: string, listTitle: string}>) =>{
      const board = state.boards.find((board) => board.id === action.payload.boardId)
      board && board.lists.push({
        id: action.payload.listId,
        title: action.payload.listTitle,
        cards: []
      })

      console.log(board)
    },


    removeList: (state, action:  PayloadAction<{boardId: string, listId: string}>) =>{
      const board = state.boards.find((board) => board.id === action.payload.boardId)
      board && board.lists.filter((list) => list.id !== action.payload.listId)

      console.log(board)
    }, 

    addCard: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string, text: string}>) =>{
      const board = state.boards.find((board) => board.id === action.payload.boardId)
      const list  = board ? board.lists.find((list)=> list.id === action.payload.listId) : null;

      list && list.cards.push({
        id: action.payload.cardId,
        text: action.payload.text
      })

      console.log("Board:" + board, "List:" + list)
      
    }, 

    removeCard: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string }>) =>{
      const board = state.boards.find((board) => board.id === action.payload.boardId)
      const list  = board ? board.lists.find((list)=> list.id === action.payload.listId) : null;

      list && list.cards.filter((card) => card.id !== action.payload.cardId)

      console.log("Board:" + board, "List:" + list)
    }
    },
})

// Action creators are generated for each case reducer function
export const { addList, removeList, addBoard, removeBoard, addCard, removeCard } = BoardSlice.actions

export default BoardSlice.reducer