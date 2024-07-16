import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Link } from "react-router-dom"
import { NavbarComp } from "./index"
import NewBoardPopover from "./NewBoardPopover"

function Home() {
  const boards = useSelector((state: RootState) => state.board.boards)
  
  return (
    <>
    <NavbarComp/>
    <div className="flex flex-col m-2 p-2">
      <h2 className="ml-2">Boards:</h2>
      <div className="flex flex-between flex-auto">
        {boards.map((board)=>{
          return(
            <div className={`${board.backgroundColor} w-1/6 border cursor-pointer ml-2`}>
                {/* <button onClick={()=> dispatch(deleteBoard({ id: board.id }))}>Delete</button> */}
                <Link to={`/board/${board.id}`}>
                  <div className="m-2 flex flex-col p-2 w-full h-16">{board.title}</div>
                </Link>
            </div>
          )
        })} 
          <NewBoardPopover placement="right" buttonStyle="h-full w-full p-2 ml-2" buttonText={`Create new board ${boards.length} remaining`}/>            
      </div>
    </div>
    </> 
  )
}

export default Home