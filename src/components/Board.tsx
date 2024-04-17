import { Link, useParams } from "react-router-dom"
import BoardList from "./BoardList";

function Board() {
    const params =  useParams<{id: string}>();
    return (
        <div className="m-2 p-2">
            <p>Board {params.id}</p>
            <div className="border">
                <BoardList/>
            </div>
        </div>
    )
}

export default Board
