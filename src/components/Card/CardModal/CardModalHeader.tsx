import { Input, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'

function CardModalHeader({text, handleChange}) {
  const [newText, setNewText] = useState<string>('')
  const [isEditingText, setIsEditingText] = useState<boolean>(false)

  const handleTextChange = (text) => {
    handleChange(text)
    setIsEditingText(false)
  }


  return (
    !isEditingText ? (<ModalHeader onClick={()=>setIsEditingText(true)} className="flex flex-col gap-1">{text}</ModalHeader>) :
    ( <div className='p-6'>
        <Input 
          onChange={(e)=>setNewText(e.target.value)}
          onBlur={()=>handleTextChange(newText)}
          defaultValue={text}
          autoFocus
        /> 
      </div>
    )
  )
}

export default CardModalHeader