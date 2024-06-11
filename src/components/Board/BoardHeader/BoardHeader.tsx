import React from 'react'

function BoardHeader({boardTitle}) {
  return (
    <div className="flex w-screen p-2">
            <p>{boardTitle}</p>
        </div>
  )
}

export default BoardHeader