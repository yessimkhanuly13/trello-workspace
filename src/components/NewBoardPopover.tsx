import React from 'react'
import { Button, Popover, PopoverTrigger, PopoverContent, Input } from '@nextui-org/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard } from '../store/board/boardSlice'
import { v4 as uuidv4 } from 'uuid';

export interface Gradient {
    style: string
}

export const COLORS: Gradient[] = [
    {style: "bg-gradient-to-r from-green-400 from-pink-500"},
    {style: "bg-gradient-to-r from-green-400 to-blue-500"}, 
    {style: "bg-gradient-to-r from-pink-500 to-yellow-500"}, 
    {style: "bg-gradient-to-r from-indigo-500 to-yellow-500"}
  ]

function NewBoardPopover({placement, buttonStyle="", buttonText="Create"}){
    const [boardTitle, setBoardTitle] = useState<string>("")
    const [isValid, setIsValid] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [backgroundColor, setBackgroundColor] = useState<string>("")
    const dispatch = useDispatch()
  
    const handleChange = (e) => {
      setBoardTitle(e.target.value)
      setIsValid(true)
    }
  
  
    const handleClick = () => {
      if(boardTitle === ""){
        setIsValid(false)
        return 
      }
  
      const boardId = uuidv4()
      dispatch(addBoard({boardId,boardTitle, backgroundColor}))
      setBoardTitle("")
      setIsOpen(false)
      setBackgroundColor("")
    }
  
    const handleChangeBg = (value) => {
      setBackgroundColor(value)
      console.log(value)
    }
  return (
    <div>
        <Popover 
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            placement={placement}
            showArrow={true} 
            offset={20} 
            radius='none'>
            <PopoverTrigger>
              <Button radius='none' color='primary' className={buttonStyle}>{buttonText}</Button>
            </PopoverTrigger>
            <PopoverContent>
            <div className='py-2'>
                <p className='text-start'>Background:</p>
                <div className={`mt-1 ${backgroundColor} p-2`}>
                  <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="" />
                </div>
                <div className='grid grid-cols-4 grid-flow-col gap-2 mt-1'>
                    {
                      COLORS.map((gradient)=>{
                        return (
                          <Button className={`mt-1 ${gradient.style}`} radius='sm' isIconOnly onClick={()=>handleChangeBg(gradient.style)}>
                          </Button>
                        )
                      })
                    }
                </div>
              </div>

              <div className='p-4'>
              <Input 
                label='Board title' 
                labelPlacement="outside" 
                isRequired 
                description="👋 Board title is required" 
                radius='sm' 
                placeholder='Amazing board' 
                value={boardTitle}
                isInvalid={!isValid}
                onChange={(e)=>handleChange(e)}/>
                
              <Button 
               onClick={handleClick} 
               className='w-full' radius='none'
               color='primary'
               >
                Create
                </Button>
              </div>

            </PopoverContent>
          </Popover>
    </div>
  )
}

export default NewBoardPopover