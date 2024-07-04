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
        
        dragListSwap: (state, action: PayloadAction<{listId: string, swapListId: string}>)=>{
            const swapList = state.lists.find((list)=>list.id === action.payload.swapListId)
            const list = state.lists.find((list)=>list.id === action.payload.listId)
    
            const indexOfSwapList = state.lists.indexOf(swapList)
            const indexOfList = state.lists.indexOf(list)
    
            state.lists[indexOfList] = swapList
            state.lists[indexOfSwapList] = list
    
            return 
        },
        
        addList: (state, action: PayloadAction<{listId: string, listTitle: string}>) =>{
            state.lists.push({
                title: action.payload.listTitle,
                id: action.payload.listId,
                cards: []
            })
        },
    
    
        removeList: (state, action:  PayloadAction<{listId: string}>) =>{
            state.lists.filter((list)=>list.id !== action.payload.listId )
        }, 
    
        changeListTitle: (state, action: PayloadAction<{listId: string, title: string}>)=> {
            const newLists = state.lists.map((list)=>{
            if(list.id === action.payload.listId){
                return {
                ...list, title: action.payload.title
                }
            }
            return list
            })
            
            state.lists = newLists
    
        }
    }
})

export const {
    addList, removeList, changeListTitle,
    dragListSwap,
} = ListSlice.actions

export default ListSlice.reducer