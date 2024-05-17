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

export interface Board {
  lists: List[], 
  title: string,
  id: string
}

export interface Boards {
  boards: Board[]
}

const initialState = {
  boards: [
    {
      title: "Amazing Board",
      id: "board_1",
      lists: [
        {
          title: "Interesting List",
          id: "list_1",
          cards: [
            {
              id: "card_1",
              text: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!"
            },
            {
              id: "card_2",
              text: "Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body."
            },
            {
              id: "card_3",
              text: "A group of flamingos is called a 'flamboyance'."
            },
            {
              id: "card_4",
              text: "The shortest war in history lasted only 38 minutes. It was between Britain and Zanzibar in 1896."
            }
          ]
        },
        {
          title: "Exciting List",
          id: "list_2",
          cards: [
            {
              id: "card_5",
              text: "Bananas are berries, but strawberries aren't."
            },
            {
              id: "card_6",
              text: "Cows have best friends and can become stressed when they are separated."
            },
            {
              id: "card_7",
              text: "Penguins can jump up to 6 feet in the air."
            },
            {
              id: "card_8",
              text: "A single cloud can weigh more than 1 million pounds."
            }
          ]
        },
        {
          title: "Fascinating List",
          id: "list_3",
          cards: [
            {
              id: "card_9",
              text: "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the iron."
            },
            {
              id: "card_10",
              text: "Kangaroos cannot walk backwards."
            },
            {
              id: "card_11",
              text: "A small child could swim through the veins of a blue whale."
            },
            {
              id: "card_12",
              text: "Sea otters hold hands when they sleep to keep from drifting apart."
            }
          ]
        }
      ]
    }
  ]
};



export const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<{boardId: string, boardTitle: string}>) =>{
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
      console.log("Board: ",board)
      const list  = board ? board.lists.find((list)=> list.id === action.payload.listId) : null;
      console.log("List: ",list)
      list && list.cards.push({
        id: action.payload.cardId,
        text: action.payload.text
      })

      console.log("Board:" + board, "List:" + list)
      
    }, 

    removeCard: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string }>) =>{
      const board = state.boards.find((board) => board.id === action.payload.boardId)
      const list  = board ? board.lists.find((list)=> list.id === action.payload.listId) : null;

      list.cards =  list.cards.filter((card) => card.id !== action.payload.cardId)

      console.log("Board:" + board, "List:" + list)
    },

    dragCard: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string, prevListId: string}>) => {

      if(action.payload.prevListId === action.payload.listId){
        return
      }

      const board = state.boards.find((board)=> board.id === action.payload.boardId)
      const list = board ? board.lists.find((list) => list.id === action.payload.listId) : null
      const prevList = board ? board.lists.find((prevList) => prevList.id === action.payload.prevListId) : null
      const currentCard = prevList ? prevList.cards.find((card)=> card.id === action.payload.cardId) : null

      const isExist = list?.cards.find((card)=>card.id === action.payload.cardId)

      prevList.cards = prevList.cards.filter((card) => card.id !== action.payload.cardId)

      if(!isExist){
        list && list.cards.push(currentCard)
        console.log("drag card")
      }
    
    }, 
    dragCardSwap: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string, swapCardId: string, prevListId: string}>) => {
      const board = state.boards.find((board)=>board.id === action.payload.boardId);
      const list = board && board.lists.find((list)=>list.id === action.payload.listId)
      const prevList = board && board.lists.find((list)=> list.id === action.payload.prevListId)
      const card = prevList && prevList.cards.find((card)=> card.id === action.payload.cardId)
      const swapCard = list && list.cards.find((card)=> card.id === action.payload.swapCardId)

      const indexOfSwapCard = list && list.cards.indexOf(swapCard)

      if(indexOfSwapCard > -1 && card && list && !list.cards.includes(card)){
        const firstHalf = list.cards.slice(0, indexOfSwapCard)
        const secondHalf = list.cards.slice(indexOfSwapCard)
        const newCards = [...firstHalf, card, ...secondHalf]
        list.cards = newCards
      }

      if(list?.cards.includes(card)){
        const index = list.cards.indexOf(card)
        list.cards[index] = swapCard
        list.cards[indexOfSwapCard] = card
      }

      if(!action.payload.swapCardId){
        list?.cards.push(card)
      }
      console.log("drag card swap")

    },

    dragListSwap: (state, action: PayloadAction<{boardId: string, listId: string, swapListId: string}>)=>{
      const board = state.boards.find((board)=>board.id === action.payload.boardId)
      const swapList = board?.lists.find((list)=>list.id === action.payload.swapListId)
      const list = board?.lists.find((list)=>list.id === action.payload.listId)

      const indexOfSwapList = board?.lists.indexOf(swapList)
      const indexOfList = board?.lists.indexOf(list)

      board.lists[indexOfList] = swapList
      board.lists[indexOfSwapList] = list

      return 
    }
    },
})

// Action creators are generated for each case reducer function
export const { addList, removeList, addBoard, removeBoard, addCard, removeCard, dragCard, dragCardSwap, dragListSwap } = BoardSlice.actions

export default BoardSlice.reducer