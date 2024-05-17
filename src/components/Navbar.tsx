import { Button, Navbar, NavbarContent, Popover, PopoverTrigger, PopoverContent, Input } from '@nextui-org/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBoard } from '../store/board/boardSlice'
import { v4 as uuidv4 } from 'uuid';

function NavbarComp() {
  const [boardTitle, setBoardTitle] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
    dispatch(addBoard({boardId,boardTitle}))
    setBoardTitle("")
    setIsOpen(false)
  }
  return (
    <Navbar 
      height="2rem"
      className='flex justify-between p-2'
    >

      <NavbarContent>
        <Link to={'/'}>
              <div>Home</div>
        </Link>
          <Popover 
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            placement="bottom" 
            showArrow={true} 
            radius='none'>
            <PopoverTrigger>
              <Button radius='none'>Create</Button>
            </PopoverTrigger>
            <PopoverContent className='p-4'>
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
               className='w-full' radius='none'>
                Create
                </Button>
            </PopoverContent>
          </Popover>
      </NavbarContent>
    </Navbar>
  )
}

export default NavbarComp
