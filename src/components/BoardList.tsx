import { Cards } from "../store/board/boardSlice"
import BoardCard from "./Card"

function BoardList() {
  const arr: Cards[] = [{
    id: "1",
    text: "card1",
  },
  {
    id: "3",
    text: "card3"
  },
  {
    id: "2",
    text: "card2"
  },
  {
    id: "4",
    text: "card4"
  }]

  return (
    <div className="flex flex-col">
        
      {arr.map((card)=>{
        return (
          <BoardCard data={card}/>
        )
      })}

    </div>
  )
}

export default BoardList
