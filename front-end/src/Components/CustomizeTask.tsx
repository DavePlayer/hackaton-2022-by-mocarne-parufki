import { useRef, useState } from "react"
import { TaskData } from "../commonTypes/Tasks"
import "./tempCustomizeTaskStyle.css"
import DatePicker from "react-date-picker"

import { Task } from "../commonTypes/ServerTypes" 
interface CustomizeTaskInterface {
    taskId: string
}

import {taskQuery1} from "../Queries/Graphql"
import { useQuery } from "@apollo/client"
const CustomizeTask: React.FC<CustomizeTaskInterface> = ({taskId}) => {
    const dataRef = useRef<HTMLInputElement>(null)
    const taskData = useQuery<{task: Task}>(taskQuery1, {variables: {taskId: taskId}})
    const data = taskData.data?.task
    console.log(taskId, taskData)
    const [ dates, setDates ] = useState(data?.date ? new Date(data.date) : new Date())
    if(!data) {
        return <>loading</>
    }
    const {type, shouldTake, date, TimeItTook} = data
    const startHour = new Date(parseInt(date)).getUTCHours()
    console.log(startHour)
    return (
        <div onClick={(e) => {e.stopPropagation()}} className={"CustomizeTaskContainer"} >
            <table>
                <tr>
                    <td>task title: </td><td><input ref={dataRef} defaultValue={type}/></td>
                </tr>
                <tr>
                    <td>start hour: </td><td><input defaultValue={startHour} type="number" step={1} min={1} max={8} /></td>
                    <td>task length: </td><td><input defaultValue={shouldTake} type="number" step={1} min={1} max={8} /></td>
                </tr>
                <tr>
                    <td>task date: </td>
                    <tr>
                        <DatePicker value={dates} onChange={setDates}/>
                    </tr>
                </tr>
                <button>unassign</button>
                <button>save</button>
            </table>
        </div>
    )

}

export default CustomizeTask