import { Button, card } from "@nextui-org/react";
import { useState } from "react";
import { Textarea, Input } from "@nextui-org/react";
import { addCard, removeList, dragCard } from "../store/board/boardSlice"
import { BoardCard } from "./index"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";

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
      const cardId = "" + arr.cards.length + 1;
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
      dispatch(dragCard({boardId, listId, cardId, prevListId}))
     
  }

  return (
    <div className="flex flex-col border p-2 w-64 m-4" 
    onDrop={(e) => handleDrop(e)}
    // onDragStart={(e)=> e.dataTransfer.setData("listId", arr.id)}
    onDragOver={(e)=>e.preventDefault()}
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
      {arr.cards.map((card)=>{
        return (
          <BoardCard data={card} listId={arr.id}/>
        )
      })}
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
                                placeholder="Enter a title for this card..."
                                onChange={(e)=>setCardText(e.target.value)}
                                autoFocus
                            >
                            </Textarea>
                            <div className="flex justify-between p-1">
                                <Button onPress={handleNewCard} className="m-2">
                                    Add card
                                </Button>
                                <Button onPress={()=>setIsOpen(false)} className="m-2">
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
