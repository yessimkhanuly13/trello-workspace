import { Link, useParams } from "react-router-dom"
import { BoardList, NavbarComp } from "./index";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { List, addList, removeBoard } from "../store/board/boardSlice";
import { RootState } from "../store/store";
import { v4 as uuidv4 } from "uuid"

function Board() {
    const params =  useParams<{id: string}>();
    const boards = useSelector((state: RootState)=>state.board.boards)
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [lists, setLists] = useState<List[]>([]); 
    const [listTitle, setNewList] = useState<string>("") 
    const [boardTitle, setBoardTitle] = useState<string>("")
    const dispatch = useDispatch();

    const handleLists = () => {
        const currentBoard = boards.find((board) => board.id === params.id)
        setBoardTitle(currentBoard.title)
        currentBoard && setLists(currentBoard.lists)
        currentBoard && console.log(lists)
    }

    const handleNewList = () =>{
        if(listTitle === ""){
            return
        }
        const currentBoard = boards.find((board)=>board.id === params.id)
        if(currentBoard){
            const boardId = currentBoard.id;
            const listId = uuidv4();
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

    

    useEffect(()=>{
        handleLists();
    },[boards])
    return (
        <>
        <NavbarComp/>
        <div className="flex w-screen p-2">
            <p>{boardTitle}</p>
        </div>
        <div className="m-2 p-2 flex"
            onDragOver={(e)=>e.preventDefault()}
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
                        <div className="flex flex-col w-20">
                            <Input
                                radius="sm"
                                placeholder="Enter list title..."
                                onChange={(e)=>setNewList(e.target.value)}
                                autoFocus
                            >
                            </Input>
                            <div className="flex justify-between p-1">
                                <Button
                                    radius="none"
                                    onPress={handleNewList}>
                                    Add list
                                </Button>
                                <Button
                                    radius="none" 
                                    onPress={()=>{
                                    setNewList("")
                                    setIsOpen(false)
                                }
                                    }>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        
                    )
                
                }
            </div>
        </div>
        </>
    )
}

export default Board
