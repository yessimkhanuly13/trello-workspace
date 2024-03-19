import { useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const [boards, setBoards] = useState([
    {title: "Board 1", id: 1, order: 1 },
    {title: "Board 2", id: 3, order: 2 },
    {title: "Board 3", id: 5, order: 3 }
  ])

  const [currentBoard, setCurrentBoard] = useState({})

  function dragStartHandler(e, board){
    console.log('drag',board)
    setCurrentBoard(board)
  }

  function dragEndHandler(e){
    console.log('drag end')
  }

  function dragOverHandler(e){
    e.preventDefault()
    console.log('dragOver')
  }

  function sortBoards(a, b){
    if(a.order > b.order){
      return 1
    }else{
      return -1
    }
  }

  function dropHandler(e, board){
    e.preventDefault()
    console.log('drop', board)
    setBoards(boards.map((b)=>{
      if(b.id === board.id){
        return { ...b, order: currentBoard.order}
      }
      if(b.id === currentBoard.id){
        return {...b, order: board.order}
      }
      return b
    }))
  }

  return (
    <div className='flex'>
      {
        boards.sort(sortBoards).map((board) =>{
          return (
           <Board 
            data={board}
            onDragStart={(e)=> dragStartHandler(e, board)}
            onDragLeave={(e)=> dragEndHandler(e)}
            onDragEnd={(e)=> dragEndHandler(e)}
            onDragOver={(e)=> dragOverHandler(e)}
            onDrop={(e)=> dropHandler(e, board)}
           />
          )
        })
      }
    </div>
  )
}

export default App
