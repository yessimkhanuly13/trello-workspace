import {Button} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {Textarea} from "@nextui-org/react";
import { Cards } from "../store/board/boardSlice"
import BoardCard from "./Card"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function BoardList({arr}) {

  // const params =  useParams<{id: string}>();
  // const boards = useSelector((state: RootState)=>state.board.boards)
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  // const dispatch = useDispatch();


  return (
    <div className="flex flex-col border p-2 w-64 m-4">
      {arr.title}
      {arr.cards.map((card)=>{
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
