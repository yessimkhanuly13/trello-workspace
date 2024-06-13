import { Link, useParams } from "react-router-dom"
import { BoardList, NavbarComp } from "../index";
import { LogoCross } from "../../assets/index";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { List, addList, removeBoard } from "../../store/board/boardSlice";
import { RootState } from "../../store/store";
import { v4 as uuidv4 } from "uuid"
import BoardHeader from "./BoardHeader/BoardHeader";

function Board() {
    const params =  useParams<{id: string}>();
    const boards = useSelector((state: RootState)=>state.board.boards)
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [lists, setLists] = useState<List[]>([]); 
    const [listTitle, setNewList] = useState<string>("") 
    const [boardTitle, setBoardTitle] = useState<string>("")
    const [backgroundColor, setBackgroundColor] = useState<string>("")
    const dispatch = useDispatch();

    const handleLists = () => {
        const currentBoard = boards.find((board) => board.id === params.id)
        setBoardTitle(currentBoard.title)
        currentBoard && setLists(currentBoard.lists)
        currentBoard && console.log(lists)
        currentBoard && setBackgroundColor(currentBoard.backgroundColor)
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
        <div className= {`${backgroundColor} overflow-auto no-scrollbar space-x-4 h-screen overflow-y-hidden`}>
        <NavbarComp/>
        <BoardHeader boardTitle={boardTitle}/>
        <div className="flex h-screen"
            onDragOver={(e)=>e.preventDefault()}
        >
            <div className="flex max-w-screen">
                {
                    lists && lists.map((list)=>{
                        return (
                            <BoardList arr={list}/>
                        )
                    })
                }
            </div>
            <div>
               {
                !isOpen ? ( 
                    <Button 
                        radius="full" 
                        className="rounded w-72 bg-slate-100"
                        onPress={()=>setIsOpen(true)}    
                    >
                   + Add another list
                    </Button>) 
                    : 
                    (
                        <div className="flex flex-col w-72">
                            <Input
                                radius="sm"
                                placeholder="Enter list title..."
                                onChange={(e)=>setNewList(e.target.value)}
                                autoFocus
                            >
                            </Input>
                            <div className="flex justify-start">
                                <Button
                                    radius="none"
                                    className="mt-1"
                                    color="primary"
                                    onPress={handleNewList}>
                                    Add list
                                </Button>
                                <Button
                                    radius="none" 
                                    className="mt-1 ml-1 bg-transparent hover:bg-slate-100"
                                    isIconOnly
                                    onPress={()=>{
                                    setNewList("")
                                    setIsOpen(false)
                                }
                                    }>
                                    <LogoCross/>
                                </Button>
                            </div>
                        </div>
                        
                    )
                
                }
            </div>
        </div>
        </div>
    )
}

export default Board
