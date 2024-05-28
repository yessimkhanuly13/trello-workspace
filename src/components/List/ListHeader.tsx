import { Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeListTitle } from '../../store/board/boardSlice';
import { useParams } from 'react-router-dom';

function ListHeader({list}) {
    const [title, setNewTitle] = useState<string>('');
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)
    const dispatch = useDispatch()
    const params =  useParams<{id: string}>();

    const handleChange = () => {
        setIsEditingTitle(false)
        if(title === "" || title === list.title){
            console.log("...")
            return 
        }
        const boardId = params.id
        const listId = list.id
        dispatch(changeListTitle({boardId, listId, title}))
    }
  return (
    <div onClick={()=>setIsEditingTitle(true)}>
      {isEditingTitle ? 
          (
              <Input
                autoFocus
                onBlur={handleChange}
                defaultValue={list.title}
                onChange={(e)=>setNewTitle(e.target.value)}
                />
          ) : (
          <div className="flex align-center justify-center">
            <h1 className="p-2">{list.title}</h1>
          </div>

        )
        }
    </div>
  )
}

export default ListHeader
