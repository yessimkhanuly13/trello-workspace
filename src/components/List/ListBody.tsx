import React from 'react'
import BoardCard from '../Card'

function ListBody({list}) {
  return (
    <div className="flex flex-col scroll-m-0.5 overflow-auto max-h-96">
        {list.cards.map((card)=>{
            return (
              <BoardCard data={card} listId={list.id}/>
            )
          })
        }
    </div>
  )
}

export default ListBody
