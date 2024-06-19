import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { COLORS } from '../../NewBoardPopover'

function LabelPopover({handleLabel}) {
  return (
    <div>
        <Popover placement="right" showArrow={true} offset={20} >
                <PopoverTrigger>
                    <Button radius="none" className='w-full'>Labels</Button>
                </PopoverTrigger>
                <PopoverContent>
                <div className='flex flex-col gap-2 mt-1'>
                    {
                      COLORS.map((gradient)=>{
                        return (
                          <Button className={`mt-1 ${gradient.style} w-full`} radius='sm' isIconOnly onClick={()=>handleLabel(gradient.style)}>
                          </Button>
                        )
                      })
                    }
                </div>
                </PopoverContent>
        </Popover>
    </div>
  )
}

export default LabelPopover