import { Link, useParams } from "react-router-dom"
import { BoardList } from "./index";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { List, addList, removeBoard } from "../store/board/boardSlice";
import { RootState } from "../store/store";

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
            const listId = "" + currentBoard.lists.length + 1;
            console.log(listId)
            dispatch(addList({boardId, listId, listTitle}))
            setNewList('')
            setIsOpen(false)
        }
        return
        
    }

    // const handleRemoveBoard = () =>{
    //     const currentBoard = boards.find((board)=>board.id === params.id)
    //     const boardId = currentBoard ? currentBoard.id : ""
    //     dispatch(removeBoard({boardId}))
    // }

    const handleDrop = (e) =>{
        console.log("List id: " + e.dataTransfer.getData("listId"))
        console.log("Board Id: " + params.id)
    }

    useEffect(()=>{
        handleLists();
    },[boards])
    return (
        <div className="m-2 p-2 flex"
            onDrop={(e)=>handleDrop(e)}
        >
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
                                autoFocus
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
