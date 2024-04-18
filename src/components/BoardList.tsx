import {Button} from "@nextui-org/react";
import { useState } from "react";
import {Textarea} from "@nextui-org/react";
import { Cards } from "../store/board/boardSlice"
import BoardCard from "./Card"

function BoardList() {
  const arr: Cards[] = [{
    id: "1",
    text: "cardddsddddddddd",
  },
  {
    id: "3",
    text: "card3ddddddddd"
  },
  {
    id: "2",
    text: "card2ddddddd"
  },
  {
    id: "4",
    text: "card4dddddd"
  }]

  const [isOpen, setIsOpen] = useState<Boolean>(false)

  return (
    <div className="flex flex-col border p-2 w-64">
        
      {arr.map((card)=>{
        return (
          <BoardCard data={card}/>
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
                            >
                            </Textarea>
                            <div className="flex justify-between p-1">
                                <Button onPress={()=>setIsOpen(false)} className="m-2">
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
