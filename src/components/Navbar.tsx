import { Navbar, NavbarContent } from '@nextui-org/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBoard } from '../store/board/boardSlice'
import { v4 as uuidv4 } from 'uuid';
import NewBoardPopover from './NewBoardPopover'


// interface BackgrounImgUrl {
//   url: string
// }


// const BGIMAGES: BackgrounImgUrl[] = [
//   {url: }
// ] 

function NavbarComp() {
  return (
    <Navbar 
      height="2rem"
      className='flex justify-between p-2'
    >

      <NavbarContent>
        <Link to={'/'}>
              <div>Home</div>
        </Link>
        <NewBoardPopover placement="bottom"/>
      </NavbarContent>
    </Navbar>
  )
}

export default NavbarComp
