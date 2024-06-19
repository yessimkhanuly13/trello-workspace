import { Navbar, NavbarContent } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import NewBoardPopover from './NewBoardPopover'
 

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
