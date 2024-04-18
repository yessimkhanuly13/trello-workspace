import { Link, useParams } from "react-router-dom"
import BoardList from "./BoardList";
import {Button} from "@nextui-org/react";
import { useState } from "react";
import {Input} from "@nextui-org/react";

function Board() {
    const params =  useParams<{id: string}>();
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    return (
        <div className="m-2 p-2 flex">
            <div>
                <BoardList/>
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
