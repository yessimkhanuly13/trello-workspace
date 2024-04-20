import { Link, useParams } from "react-router-dom"
import BoardList from "./BoardList";
import {Button} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {Input} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { List, addList } from "../store/board/boardSlice";

function Board() {
    const params =  useParams<{id: string}>();
    const boards = useSelector((state: RootState)=>state.board.boards)
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [lists, setLists] = useState<List[]>([]); 
    const [listTitle, setNewList] = useState<string>("") 
    const dispatch = useDispatch();

    const handleLists = () => {
        const currentBoard = boards.find((board) => board.id === params.id)
        currentBoard && setLists(currentBoard.lists)
        currentBoard && console.log(lists)
    }

    const handleNewList = () =>{
        const currentBoard = boards.find((board)=>board.id === params.id)
        if(currentBoard){
            const boardId = currentBoard.id;
            const listId = "124";
            dispatch(addList({boardId, listId, listTitle}))
        }
        return
        
    }

    useEffect(()=>{
        handleLists();
    },[boards])
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
                                onChange={(e)=>setNewList(e.target.value)}
                            >
                            </Input>
                            <div className="flex justify-between p-1">
                                <Button onPress={handleNewList} className="m-2">
                                    Add list
                                </Button>
                                <Button onPress={()=>{
                                    setNewList("")
                                    setIsOpen(false)
                                }
                                    } className="m-2">
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
