import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { parseDate, Calendar as CalendarType } from "@internationalized/date";
import { useState } from 'react';


function DueDatePopover({handleDueDate}) {
    const [value, setValue] = useState<CalendarType>(parseDate('2024-06-19'))
  
  const handleDate = (value) => {
    setValue(value)
    console.log(value.toString())
  }
  
  return (
    <div>
       <Popover placement="right" showArrow={true} offset={20} >
                        <PopoverTrigger>
                          <Button className='w-full' radius="none">Date</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar 
                            aria-label="Date (Controlled)" 
                            value={value}
                            onChange={(value)=>handleDate(value)} 
                          />
                          <div className="flex gap-4">
                            <Button onClick={()=>handleDueDate(value)}>Add</Button>
                            <Button>Cancel</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
    </div>
  )
}

export default DueDatePopover