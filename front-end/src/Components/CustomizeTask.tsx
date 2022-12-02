import { useRef } from "react"
import { TaskData } from "../commonTypes/Tasks"
import "./tempCustomizeTaskStyle.css"

interface CustomizeTaskInterface {
    taskData: TaskData
}

const CustomizeTask: React.FC<CustomizeTaskInterface> = ({taskData}) => {
    const dataRef = useRef<HTMLInputElement>(null)
    return (
        <div onClick={(e) => {e.stopPropagation()}} className={"CustomizeTaskContainer"} >
            <div>
                task title: <input ref={dataRef} defaultValue={taskData.name}/>
            </div>
            <button>unassign</button>
            <button>start</button>
        </div>
    )

}

export default CustomizeTask