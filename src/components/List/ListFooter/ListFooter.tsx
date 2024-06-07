import { Button, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addCard } from '../../store/board/boardSlice';

function ListFooter({list, currentBoard}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [text, setCardText] = useState<string>('')
    const dispatch = useDispatch()

    const handleNewCard = () => {
        const boardId = currentBoard ? currentBoard.id : ""
        console.log("Board ID: " + boardId)
        console.log("List ID: "+ list.id)
        const listId = list.id
        const cardId = uuidv4();
        dispatch(addCard({boardId, listId, cardId, text}))
        setIsOpen(false)
    }
  return (
    <div>
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
                                radius="sm"
                                placeholder="Enter a title for this card..."
                                onChange={(e)=>setCardText(e.target.value)}
                                autoFocus
                            >
                            </Textarea>
                            <div className="flex justify-between p-1">
                                <Button 
                                radius="none"
                                onPress={handleNewCard}>
                                    Add card
                                </Button>
                                <Button
                                  radius="none"
                                 onPress={()=>setIsOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        
                    )
                
                }
        </div>
  )
}

export default ListFooter
