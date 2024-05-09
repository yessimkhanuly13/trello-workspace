import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { addBoard } from "../store/board/boardSlice"
import { useState } from "react"
import { Link } from "react-router-dom"

function Home() {
  const boards = useSelector((state: RootState) => state.board.boards)
  const dispatch = useDispatch()
  const [boardTitle, setBoardTitle] = useState<string>("")

  const handleBoard = () => {
    const boardId = "" + boards.length + 1
    console.log(boardId)
    dispatch(addBoard({boardTitle, boardId}))
    console.log(boards)
  }

  
  return (
    <div className="flex flex-col m-2 p-2">
      <div className="flex flex-col">
        <input name="title" type="text" onChange={(e)=>setBoardTitle(e.target.value)}/>
        <button onClick={handleBoard}>Add new Board</button>
      </div>
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