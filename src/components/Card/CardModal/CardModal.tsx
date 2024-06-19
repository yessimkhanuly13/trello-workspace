import {Modal, ModalContent, ModalBody, ModalFooter, Button, Textarea, Popover, PopoverTrigger, Calendar, PopoverContent} from "@nextui-org/react";
import DescriptionLogo from "../../../assets/DescriptionLogo";
import { useState } from "react";
import CardModalHeader from "./CardModalHeader";
import LabelPopover from "./LabelPopover";
import { parseDate, Calendar as CalendarType } from "@internationalized/date";


export default function CardModal({isOpen, onOpenChange, text, handleChange, handleDelete, handleDueDate}) {
  const [isDescVisible, setIsDescVisible] = useState<boolean>(false)
  const [value, setValue] = useState<CalendarType>(parseDate('2024-06-19'))
  
  const handleDate = (value) => {
    setValue(value)
    console.log(value.toString())
  }
  
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
            <CardModalHeader text={text} handleChange={handleChange}/>
              <ModalBody>
                <div className="row-span-3 flex flex-col">
                  <div className="flex gap-2">
                    <DescriptionLogo/>
                    <h3>Description</h3>
                  </div>
                  <div className="flex gap-4 mt-1">
                    <Textarea 
                      onClick={()=>setIsDescVisible(!isDescVisible)}
                      placeholder="Add more detailed description"
                    />
                  </div>  
                  {
                    isDescVisible ? (
                      <div className="flex justify-end mt-1 gap-1">
                        <Button onClick={()=>setIsDescVisible(false)} color="primary">Save</Button>
                        <Button onClick={()=>setIsDescVisible(false)} variant="light" color="danger">Cancel</Button>
                    </div>
                    ):(
                      <div>
                        
                      </div>
                    )
                  }
                </div>
                <div className="float-right">
                  <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                      <span className="text-center">Add to card</span>
                      <Popover placement="right" showArrow={true} offset={20} >
                        <PopoverTrigger>
                          <Button radius="none">Labels</Button>
                        </PopoverTrigger>
                        <LabelPopover/>
                      </Popover>
                      <Popover placement="right" showArrow={true} offset={20} >
                        <PopoverTrigger>
                          <Button radius="none">Date</Button>
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
                      <Button radius="none">Attachments</Button>
                    </div>
                      <span className="text-center">Actions</span>
                      <Button radius="none">Move</Button>
                      {/* <Button radius="none">Copy</Button> */}
                      <Button radius="none" onClick={handleDelete}>Delete</Button>
                    </div>
                </div>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
