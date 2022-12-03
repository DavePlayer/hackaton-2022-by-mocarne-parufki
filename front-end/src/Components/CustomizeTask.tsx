import { useRef, useState } from "react"
import { TaskData } from "../commonTypes/Tasks"
import "./tempCustomizeTaskStyle.css"
import DatePicker from "react-date-picker"

interface CustomizeTaskInterface {
    taskData: TaskData
}

const CustomizeTask: React.FC<CustomizeTaskInterface> = ({taskData}) => {
    const dataRef = useRef<HTMLInputElement>(null)
    const [ date, setDate ] = useState(new Date())
    return (
        <div onClick={(e) => {e.stopPropagation()}} className={"CustomizeTaskContainer"} >
            <table>
                <tr>
                    <td>task title: </td><td><input ref={dataRef} defaultValue={taskData.name}/></td>
                </tr>
                <tr>
                    <td>task length: </td><td><input defaultValue={Math.max(...taskData.hours) - Math.min(...taskData.hours)} type="number" step={0.25} min={1} max={8} /></td>
                </tr>
                <tr>
                    <td>task date: </td>
                    <tr>
                        <DatePicker value={date} onChange={setDate}/>
                    </tr>
                </tr>
                <button>unassign</button>
                <button>save</button>
            </table>
        </div>
    )

}

export default CustomizeTask