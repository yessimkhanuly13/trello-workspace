import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { RootState } from "../store/store";
import { changeCardTitle, dragCardSwap, removeCard, setDueDate, setLabel } from "../../store/board/boardSlice"
import CardModal from "./CardModal/CardModal";

function BoardCard({data, listId}) {
  const params = useParams<{id: string}>()
  const dispatch = useDispatch()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleLabel = (label) => {
    const boardId = params.id
    const cardId = data.id
    dispatch(setLabel({boardId, listId, cardId, label}))
  }
  
  const handleDelete = () => {
    const boardId = params.id
    const cardId = data.id
    dispatch(removeCard({boardId, listId, cardId}))
    onOpenChange()
  }

  const handleTitleChange = (newTitle: string) =>{
    const boardId = params.id
    const cardId = data.id
    dispatch(changeCardTitle({boardId, listId, cardId, newTitle}))
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    const swapCardId = data.id;
    const prevListId = e.dataTransfer.getData("listId");
    if (cardId && listId && swapCardId && prevListId) {
      dispatch(dragCardSwap({ listId, cardId, swapCardId, prevListId }));
    } 
  }

  const handleDueDate = (date) => {
    const dueDate = date.toString()
    const boardId = params.id
    const cardId = data.id
    dispatch(setDueDate({boardId, cardId, listId, dueDate}))
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
          <div className="grid grid-cols-7 gap-1 w-full h-full">
            {data.label.map((label)=>{
              return (
                <span className={`w-8 h-4 ${label}`}></span>
              )
            })}
          </div>
          {data.text}
          {data.dueDate ? (<input type="date" value={data.dueDate} disabled className="bg-transparent"/>) : null}
        </CardBody>
      </Card>
      <CardModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        text={data.text}
        labels={data.label}
        dueDate={data.dueDate}
        handleChange={handleTitleChange}
        handleDelete={handleDelete}
        handleDueDate={handleDueDate}
        handleLabel={handleLabel}
        />
    </div>
  )
}

export default BoardCard
