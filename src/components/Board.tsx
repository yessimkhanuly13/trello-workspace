import { Link, useParams } from "react-router-dom"
import BoardList from "./BoardList";
import {Button} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {Input} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { List } from "../store/board/boardSlice";

function Board() {
    const params =  useParams<{id: string}>();
    const boards = useSelector((state: RootState)=>state.board.boards)
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [lists, setLists] = useState<List[]>([]);  

    const handleLists = () => {
        const currentBoard = boards.find((board) => board.id === params.id)
        currentBoard && setLists(currentBoard.lists)
        currentBoard && console.log(lists)
    }

    useEffect(()=>{
        handleLists();
    },[lists])
    return (
        <div className="m-2 p-2 flex">
            <div className="flex">
                {
                    lists && lists.map((list)=>{
                        return (
                            <BoardList arr={list}/>
                        )
                    })
                }
            </div>
            <div className="m-2 p-2">
               {
                !isOpen ? ( 
                    <Button 
                        radius="full" 
                        className="rounded p-4 bg-inherit"
                        onPress={()=>setIsOpen(true)}    
                    >
                   + Add another list
                    </Button>) 
                    : 
                    (
                        <div className="flex flex-col">
                            <Input
                                placeholder="Enter list title..."
                            >
                            </Input>
                            <div className="flex justify-between p-1">
                                <Button onPress={()=>setIsOpen(false)} className="m-2">
                                    Add list
                                </Button>
                                <Button onPress={()=>setIsOpen(false)} className="m-2">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        
                    )
                
                }
            </div>
        </div>
    )
}

export default Board
