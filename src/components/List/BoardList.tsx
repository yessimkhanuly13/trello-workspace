import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { removeList, dragCard, dragListSwap, Board } from "../../store/board/boardSlice"
import { LogoCross, LogoMore } from "../index"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import {ListBody, ListHeader, ListFooter} from './index'

function BoardList({arr}) {

  const params =  useParams<{id: string}>();
  const boards = useSelector((state: RootState)=>state.board.boards)
  const currentBoard = boards.find((board)=> board.id === params.id)

  const [openMore, setOpenMore] = useState<boolean>(false)
  const dispatch = useDispatch();


  const handleRemoveList = () =>{
    const boardId = currentBoard ? currentBoard.id : ""
    const listId = arr.id
    dispatch(removeList({boardId, listId}))
    setOpenMore(false)
  }

  const handleDrop = (e) =>{
      const listId = arr.id
      const cardId = e.dataTransfer.getData("cardId")
      const prevListId = e.dataTransfer.getData("listId")
      const boardId = params.id
      if(cardId && prevListId && boardId && listId){
        dispatch(dragCard({boardId, listId, cardId, prevListId}))
      }
      else{
        const swapListId = e.dataTransfer.getData("boardListId")
        swapListId && dispatch(dragListSwap({boardId, listId, swapListId}))
      }
      return 
  }

  return (
    <div className="flex-1 flex-col p-2 bg-slate-100 mr-2 w-72 rounded h-3/4 flex-wrap overflow-auto" 
      draggable
      onDragStart={(e)=>{ e.dataTransfer.setData("boardListId", arr.id)
      console.log('Drag start')
      }}
      onDragOver={(e)=>e.preventDefault()}
      onDrop={(e) => handleDrop(e)}
    >
      <div className="flex justify-between">
        <ListHeader list={arr}/>
        <Popover 
            isOpen={openMore}
            onOpenChange={(open) => setOpenMore(open)}
            placement="bottom" 
            showArrow={true} 
            radius='sm'>
            <PopoverTrigger>
              <Button className="bg-inherit" isIconOnly>
                <LogoMore/>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <div className="flex justify-between">
                  <h2 className="text-center p-2">List actions</h2>
                  <Button className="bg-ingerit" isIconOnly onClick={()=>setOpenMore(false)}>
                    <LogoCross/>
                  </Button>
                </div>
                <div>
                  <Button 
                  className='w-full bg-inherit'
                  onClick={handleRemoveList}
                  >
                    Archive this list
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
      </div>
      <ListBody list={arr}/>
      <ListFooter list={arr} currentBoard={currentBoard}/>
    </div>
  )
}

export default BoardList
