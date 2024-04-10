import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { List, addBoard, deleteBoard } from "../store/board/boardSlice"
import { useState } from "react"

function Board() {
  const boards = useSelector((state: RootState) => state.board.lists)
  const dispatch = useDispatch()
  const [newBoard, setNewBoard] = useState<List>({
    title: "",
    id: "",
    order: 0
  })

  const handleBoard = (e) => {
    const {value, name} = e.target

    setNewBoard({...newBoard, [name]: value})
    console.log(newBoard)
  }
  return (
    <>
     {boards.map((board)=>{
      return(<div className="border m-2 p-2">
        <p> Title: {board.title}</p>
        <p> Id : {board.id}</p>
        <button onClick={()=> dispatch(deleteBoard({ id: board.id }))}>Delete</button>
      </div>)
     })}
      
      <input name="title" type="text" onChange={(e)=>handleBoard(e)}/>
      <input name="id" type="text" onChange={(e)=>handleBoard(e)}/>
      <button onClick={()=>dispatch(addBoard(newBoard))}>Add new Board</button>
    </>
  )
}

export default Board