import { Button, card } from "@nextui-org/react";
import { useState } from "react";
import { Textarea, Input } from "@nextui-org/react";
import { addCard, removeList, dragCard, dragListSwap } from "../store/board/boardSlice"
import { BoardCard } from "./index"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { v4 as uuidv4 } from 'uuid';

function BoardList({arr}) {

  const params =  useParams<{id: string}>();
  const boards = useSelector((state: RootState)=>state.board.boards)
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [title, setTitle] = useState<string>('');
  const [isEditingTitle, setIsEditingTitle] = useState<Boolean>(false)
  const [text, setCardText] = useState<string>("")
  const dispatch = useDispatch();

  const handleNewCard = () => {
      const currentBoard = boards.find((board) => board.id === params.id)
      const boardId = currentBoard ? currentBoard.id : ""
      const listId = arr.id
      const cardId = uuidv4();
      dispatch(addCard({boardId, listId, cardId, text}))
      setIsOpen(false)
  }

  // const handleRemoveList = () =>{
  //   const currentBoard = boards.find((board) => board.id === params.id)
  //   const boardId = currentBoard ? currentBoard.id : ""
  //   const listId = arr.id
  //   dispatch(removeList({boardId, listId}))
  // }

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
    <div className="flex-1 flex-col p-2 max-w-16 m-4 h-screen" 
      draggable
      onDragStart={(e)=>{ e.dataTransfer.setData("boardListId", arr.id)
      console.log('Drag start')
      }}
      onDragOver={(e)=>e.preventDefault()}
      onDrop={(e) => handleDrop(e)}
    >
      {isEditingTitle ? 
        (
            <Input
              autoFocus
              onBlur={()=>setIsEditingTitle(false)}
              defaultValue={arr.title}
              />
        ) : (<h1 onClick={()=>setIsEditingTitle(true)}>{arr.title}</h1>)
      }
      <div className="flex flex-col">{arr.cards.map((card)=>{
        return (
          <BoardCard data={card} listId={arr.id}/>
        )
      })}
      </div>

      {
                !isOpen ? ( 
                    <Button 
                        radius="full" 
                        className="rounded p-4 bg-inherit"
                        onPress={()=>setIsOpen(true)}    
                    >
                   + Add another card
                    </Button>) 
                    : 
                    (
                        <div className="flex flex-col">
                            <Textarea
                                radius="sm"
                                placeholder="Enter a title for this card..."
                                onChange={(e)=>setCardText(e.target.value)}
                                autoFocus
                            >
                            </Textarea>
                            <div className="flex justify-between p-1">
                                <Button 
                                radius="none"
                                onPress={handleNewCard}>
                                    Add card
                                </Button>
                                <Button
                                  radius="none"
                                 onPress={()=>setIsOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        
                    )
                
                }


    </div>
  )
}

export default BoardList
