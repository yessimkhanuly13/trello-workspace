import {Card, CardBody} from "@nextui-org/react";

function BoardCard({data}) {
  return (
    <div className="p-1">
      <Card
      className="rounded-sm"
        isHoverable
        isPressable
      >
        <CardBody>
          <p>{data.text}</p>
        </CardBody>
      </Card>
    </div>
  )
}

export default BoardCard
