import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { List, addBoard, deleteBoard } from "../store/board/boardSlice"
import { useState } from "react"
import { Link } from "react-router-dom"

function Home() {
  const boards = useSelector((state: RootState) => state.board.boards)
  // const dispatch = useDispatch()
  // const [newBoard, setNewBoard] = useState<List>({
  //   title: "",
  //   id: "", 
  //   cards: []
  // })

  // const handleBoard = (e) => {
  //   const {value, name} = e.target

  //   setNewBoard({...newBoard, [name]: value})
  //   console.log(newBoard)
  // }

  
  return (
    <div className="flex flex-col m-2 p-2">
      {/* <div className="flex flex-col">
        <input name="title" type="text" onChange={(e)=>handleBoard(e)}/>
        <input name="id" type="text" onChange={(e)=>handleBoard(e)}/>
        <button onClick={()=>dispatch(addBoard(newBoard))}>Add new Board</button>
      </div> */}
      <h2>Boards:</h2>
      <div className="flex flex-between flex-auto">
        {boards.map((board)=>{
          return(
            <div className="border m-2 flex flex-col p-2">
                {/* <button onClick={()=> dispatch(deleteBoard({ id: board.id }))}>Delete</button> */}
                <Link to={`/board/${board.id}`}>
                  <div>{board.title}</div>
                </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home