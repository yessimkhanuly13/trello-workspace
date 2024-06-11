import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { RootState } from "../store/store";
import { dragCardSwap } from "../../store/board/boardSlice"
import CardModal from "./CardModal/CardModal";

function BoardCard({data, listId}) {
  const params = useParams<{id: string}>()
  const dispatch = useDispatch()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  // const handleRemove = (cardId) =>{
  //   const currentBoard = boards.find((board)=> board.id === params.id)
  //   const boardId = currentBoard ? currentBoard.id : ""
  //   const listId = arr.id
  //   dispatch(removeCard({boardId, listId, cardId}))
  // }

  const handleDrop = (e) => {
    console.log("Trigger 2")
    const cardId = e.dataTransfer.getData("cardId")
    const boardId = params.id
    const swapCardId = data.id
    const prevListId = e.dataTransfer.getData("listId")
    if(cardId && listId && cardId && swapCardId && prevListId){
      dispatch(dragCardSwap({boardId, listId, cardId, swapCardId, prevListId}))
    }

    return 
  }

  return ( 
    <div className="flex-1 p-1 max-w-full">
      <Card
        onPress={onOpen}
        radius="sm"
        isHoverable
        isPressable
        draggable 
        onDragOver={(e)=>{
          e.preventDefault()
        }} 
        onDragStart={(e)=>{
          e.dataTransfer.setData("cardId", data.id)
          e.dataTransfer.setData("listId", listId)
        }} 
        onDrop={(e)=>handleDrop(e)}
      >
        <CardBody className="flex-1 max-w-1/5">
          {data.text}
        </CardBody>
      </Card>
      <CardModal isOpen={isOpen} onOpenChange={onOpenChange} text={data.text}/>
    </div>
  )
}

export default BoardCard
