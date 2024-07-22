import React, { useEffect, useState } from 'react'
import BoardCard from '../../Card/Card'


function ListBody({cards, listId}) {
  
  return (
    <div className="flex flex-col scroll-m-0.5 overflow-auto max-h-96">
        {cards.map((card)=>{
            return (
              <BoardCard data={card} listId={listId}/>
            )
          })
        }
    </div>
  )
}

export default ListBody
