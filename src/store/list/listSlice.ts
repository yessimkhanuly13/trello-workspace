import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    lists: [
        {
            title: "Interesting List",
            id: "list_1",
            cards: ["card_1", "card_2", "card_3", "card_4"]
        },
        {
            title: "Exciting List",
            id: "list_2",
            cards: ["card_5", "card_6", "card_7", "card_8"]
        },
        {
            title: "Fascinating List",
            id: "list_3",
            cards: ["card_9", "card_10", "card_11", "card_12" ]
          }
    ]
}

export const ListSlice = createSlice({
    name: "list",
    initialState, 
    reducers: {
        
        dragListSwap: (state, action: PayloadAction<{boardId: string, listId: string, swapListId: string}>)=>{
            const board = state.boards.find((board)=>board.id === action.payload.boardId)
            const swapList = board?.lists.find((list)=>list.id === action.payload.swapListId)
            const list = board?.lists.find((list)=>list.id === action.payload.listId)
    
            const indexOfSwapList = board?.lists.indexOf(swapList)
            const indexOfList = board?.lists.indexOf(list)
    
            board.lists[indexOfList] = swapList
            board.lists[indexOfSwapList] = list
    
            return 
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
            board.lists = board.lists.filter((list) => list.id !== action.payload.listId)
    
            console.log(board)
        }, 
    
        changeListTitle: (state, action: PayloadAction<{boardId: string, listId: string, title: string}>)=> {
            const board = state.boards.find((board)=> board.id === action.payload.boardId)
            const newLists = board?.lists.map((list)=>{
            if(list.id === action.payload.listId){
                return {
                ...list, title: action.payload.title
                }
            }
            return list
            })
            
            board.lists = newLists
    
        }
    }
})

export const {
    addList, removeList, changeListTitle,
    dragListSwap,
} = ListSlice.actions

export default ListSlice.reducer