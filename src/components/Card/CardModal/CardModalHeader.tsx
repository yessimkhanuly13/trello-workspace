import { Input, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'

function CardModalHeader({title}) {
  const [newTitle, setNewTitle] = useState<string>('')
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)

  const handleChange = () => {
    setIsEditingTitle(false)
  }
  return (
    !isEditingTitle ? (<ModalHeader onClick={()=>setIsEditingTitle(true)} className="flex flex-col gap-1">{title}</ModalHeader>) :
    ( <div className='p-6'>
        <Input 
          onChange={(e)=>setNewTitle(e.target.value)}
          onBlur={handleChange}
          defaultValue={title}
          autoFocus
        /> 
      </div>
    )
  )
}

export default CardModalHeader