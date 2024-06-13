import {Modal, ModalContent, ModalBody, ModalFooter, Button, Textarea} from "@nextui-org/react";
import DescriptionLogo from "../../../assets/DescriptionLogo";
import { useState } from "react";
import CardModalHeader from "./CardModalHeader";

export default function CardModal({isOpen, onOpenChange, text, handleChange}) {
  const [isDescVisible, setIsDescVisible] = useState<boolean>(false)
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
                    ) : (
                      <div>

                      </div>
                    )
                  }
                </div>
                <div className="float-right">
                  <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                      <span className="text-center">Add to card</span>
                      <Button radius="none">Labels</Button>
                      <Button radius="none">Dates</Button>
                      <Button radius="none">Attachments</Button>
                    </div>
                      <span className="text-center">Actions</span>
                      <Button radius="none">Move</Button>
                      <Button radius="none">Copy</Button>
                      <Button radius="none">Archive</Button>
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
