import React, { useEffect, useState } from 'react'
import BoardCard from '../../Card/Card'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'


function ListBody({list}) {
  const cards = useSelector((state: RootState)=>state.board.cards)
  const [listCards, setListCards] = useState([])

  useEffect(()=>{ 
    const newCards = cards.filter((card)=>{
      if(list.cards.includes(card.id)){
        return card
      }
    })

    setListCards(newCards)
  },[])
  return (
    <div className="flex flex-col scroll-m-0.5 overflow-auto max-h-96">
        {listCards.map((card)=>{
            return (
              <BoardCard data={card} listId={list.id}/>
            )
          })
        }
    </div>
  )
}

export default ListBody
