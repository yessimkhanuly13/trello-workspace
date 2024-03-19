function Board({data, onDragStart, onDragEnd, onDrop, onDragOver, onDragLeave}) {
  return (
    <div 
        className='flex-1 border m-2 p-2'
        draggable={true}
        onDragStart={onDragStart}
        onDragLeave={onDragLeave}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
    >
        {data.title}
        <p>Order: {data.order}</p>
        <p>ID:{data.id}</p>
    </div>
  )
}

export default Board