import { useParams } from "react-router-dom"

function Board() {
    const params =  useParams<{id: string}>();
    return (
        <div>
            Hello, world! {params.id}
        </div>
    )
}

export default Board
