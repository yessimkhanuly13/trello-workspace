import { Card, CardBody } from "@nextui-org/react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { RootState } from "../store/store";
// import { removeCard } from "../store/board/boardSlice"

function BoardCard({data}) {
  // const boards = useSelector((state: RootState)=>state.board.boards)
  // const params = useParams<{id: string}>()
  // const dispatch = useDispatch()
  
  // const handleRemove = (cardId) =>{
  //   const currentBoard = boards.find((board)=> board.id === params.id)
  //   const boardId = currentBoard ? currentBoard.id : ""
  //   const listId = arr.id
  //   dispatch(removeCard({boardId, listId, cardId}))
  // }

  return ( 
    <div className="p-1">
      <Card
      className="rounded-sm"
        isHoverable
        isPressable
        onPress={()=>console.log('Press' + data.id)}
        draggable 
        onDragOver={(e)=>{
          e.preventDefault()
        }} 
        onDragStart={(e)=>e.dataTransfer.setData("cardId", data.id)} 
      >
        <CardBody>
          <p>{data.text}</p>
        </CardBody>
      </Card>
    </div>
  )
}

export default BoardCard
