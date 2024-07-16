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
  ], 
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
  ],
  cards: [
    {
      id: "card_1",
      text: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
      dueDate: "",
      label: ["bg-gradient-to-r from-green-400 from-pink-500"]
    },
    {
      id: "card_2",
      text: "Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body.",
      dueDate: "",
      label: []
    },
    {
      id: "card_3",
      text: "A group of flamingos is called a 'flamboyance'.",
      dueDate: "",
      label: []
    },
    {
      id: "card_4",
      text: "The shortest war in history lasted only 38 minutes. It was between Britain and Zanzibar in 1896.",
      dueDate: "",
      label: []
    },
    {
        id: "card_5",
        text: "Bananas are berries, but strawberries aren't.",
        dueDate: "",
        label: []
    },
    {
        id: "card_6",
        text: "Cows have best friends and can become stressed when they are separated.",
        dueDate: "",
        label: []
    },
    {
        id: "card_7",
        text: "Penguins can jump up to 6 feet in the air.",
        dueDate: "",
        label: []
    },
    {
        id: "card_8",
        text: "A single cloud can weigh more than 1 million pounds.",
        dueDate: "",
        label: []
    },
    {
        id: "card_9",
        text: "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the iron.",
        dueDate: "",
        label: []
      },
      {
        id: "card_10",
        text: "Kangaroos cannot walk backwards.",
        dueDate: "",
        label: []
      },
      {
        id: "card_11",
        text: "A small child could swim through the veins of a blue whale.",
        dueDate: "",
        label: []
      },
      {
        id: "card_12",
        text: "Sea otters hold hands when they sleep to keep from drifting apart.",
        dueDate: "",
        label: []
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
    }, 

    addListToBoard: (state, action: PayloadAction<{boardId: string, listId: string}>) => {
      const board = state.boards.find((board)=> board.id === action.payload.boardId)

      board?.lists.push(action.payload.listId)
    },
    addCard: (state, action: PayloadAction<{cardId: string, text: string}>) =>{     
      state.cards.push({
        id: action.payload.cardId,
        text: action.payload.text,
        dueDate: "",
        label: []
      })
      
    }, 

    removeCard: (state, action: PayloadAction<{ cardId: string }>) =>{
      state.cards.filter((card) => card.id !== action.payload.cardId)
    },

    dragCard: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string, prevListId: string}>) => {

      if(action.payload.prevListId === action.payload.listId){
        return
      }

      const list = state.lists.find((list) => list.id === action.payload.listId) 
      const prevList = state.lists.find((prevList) => prevList.id === action.payload.prevListId) 
      const currentCard = prevList ? prevList.cards.find((card)=> card === action.payload.cardId) : null

      const isExist = list?.cards.find((card)=>card === action.payload.cardId)

      prevList.cards = prevList.cards.filter((card) => card !== action.payload.cardId)

      if(!isExist){
        list && list.cards.push(currentCard)
        console.log("drag card")
      }
    
    }, 
    dragCardSwap: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string, swapCardId: string, prevListId: string}>) => {
      const list = state.lists.find((list)=>list.id === action.payload.listId)
      const prevList = state.lists.find((list)=> list.id === action.payload.prevListId)
      const card = prevList && prevList.cards.find((card)=> card === action.payload.cardId)
      const swapCard = list && list.cards.find((card)=> card === action.payload.swapCardId)

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
    setLabel: (state, action: PayloadAction<{boardId: string, cardId: string, listId: string, label: String}>) => {
      state.cards.map((card)=>{
        if(card.id === action.payload.cardId){
          card.label.push(action.payload.label)
        }

        return card
      })
    },
    setDueDate: (state, action: PayloadAction<{boardId: string, cardId: string, listId: string, dueDate: string}>) => {
      state.cards.map((card)=>{
        if(card.id === action.payload.cardId){
          return {...card, dueDate: action.payload.dueDate}
        }
        return card
      })
    },
    changeCardTitle: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string, newTitle: string}>)=>{
      state.cards.map((card)=>{
        if(card.id === action.payload.cardId){
          return {
            ...card, text: action.payload.newTitle
          }
        }
        return card
      })
    },
    dragListSwap: (state, action: PayloadAction<{boardId: string, listId: string, swapListId: string}>)=>{
      const board = state.boards.find((board)=>board.id === action.payload.boardId)
      const swapList = board?.lists.find((list)=>list === action.payload.swapListId)
      const list = board?.lists.find((list)=>list === action.payload.listId)

      const indexOfSwapList = board?.lists.indexOf(swapList)
      const indexOfList = board?.lists.indexOf(list)

      board.lists[indexOfList] = swapList
      board.lists[indexOfSwapList] = list

      return 
  },
  
  addList: (state, action: PayloadAction<{listId: string, listTitle: string}>) =>{
      state.lists.push({
          title: action.payload.listTitle,
          id: action.payload.listId,
          cards: []
      })
  },


  removeList: (state, action:  PayloadAction<{boardId: string, listId: string}>) =>{
      const board = state.boards.find((board) => board.id === action.payload.boardId)
      board ? board.lists = board.lists.filter((list) => list !== action.payload.listId) : null
      state.lists.filter((list)=>list.id !== action.payload.listId )
  }, 

  changeListTitle: (state, action: PayloadAction<{listId: string, title: string}>)=> {
    state.lists.map((list)=>{
      if(list.id === action.payload.listId){
          return {
          ...list, title: action.payload.title
          }
      }
      return list
      })
  }
    }
})

// Action creators are generated for each case reducer function
export const { 
  addBoard, 
  removeBoard, 
  addListToBoard,
  addList, removeList, changeListTitle,
  dragListSwap,
  addCard, removeCard, changeCardTitle,
  setLabel, setDueDate, dragCard,
  dragCardSwap,
} = BoardSlice.actions

export default BoardSlice.reducer