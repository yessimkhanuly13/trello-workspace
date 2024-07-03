import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
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
}

export const CardSlice = createSlice({ 
    name: "card",
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string, text: string}>) =>{
            console.log(action.payload.text)
           
            const board = state.boards.find((board) => board.id === action.payload.boardId)
            const list  = board ? board.lists.find((list)=> list.id === action.payload.listId) : null;
      
            list && list.cards.push({
              id: action.payload.cardId,
              text: action.payload.text,
              dueDate: "",
              label: []
            })
            
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
          setLabel: (state, action: PayloadAction<{boardId: string, cardId: string, listId: string, label: String}>) => {
            const board = state.boards.find((board)=>board.id === action.payload.boardId)
            const list = board?.lists.find((list)=>list.id === action.payload.listId)
            const updatedCards = list?.cards.map((card)=>{
              if(card.id === action.payload.cardId){
                card.label.push(action.payload.label)
              }
      
              return card
            })
      
            list.cards = updatedCards
          },
          setDueDate: (state, action: PayloadAction<{boardId: string, cardId: string, listId: string, dueDate: string}>) => {
            const board = state.boards.find((board)=>board.id === action.payload.boardId)
            const list = board?.lists.find((list)=>list.id === action.payload.listId)
            const updatedCards = list?.cards.map((card)=>{
              if(card.id === action.payload.cardId){
                return {...card, dueDate: action.payload.dueDate}
              }
              return card
            })
      
            list.cards = updatedCards
          },
          changeCardTitle: (state, action: PayloadAction<{boardId: string, listId: string, cardId: string, newTitle: string}>)=>{
            const board = state.boards.find((board)=>board.id === action.payload.boardId)
            const list = board?.lists.find((list)=>list.id === action.payload.listId)
            const newCards = list?.cards.map((card)=>{
              if(card.id === action.payload.cardId){
                return {
                  ...card, text: action.payload.newTitle
                }
              }
              return card
            })
      
            list.cards = newCards
          }
    }

})


export const { 
    addCard, removeCard, changeCardTitle,
    setLabel, setDueDate, dragCard,
    dragCardSwap, 
  } = CardSlice.actions
  
  export default CardSlice.reducer