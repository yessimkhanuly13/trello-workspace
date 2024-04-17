import {Card, CardBody} from "@nextui-org/react";

function BoardCard({data}) {
  return (
    <div className="p-2">
      <Card>
        <CardBody>
          <p>{data.text}</p>
        </CardBody>
      </Card>
    </div>
  )
}

export default BoardCard
