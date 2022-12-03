import { useRef, useState } from "react"
import "./tempCustomizeTaskStyle.css"
import DatePicker from "react-date-picker"

import { Task } from "../commonTypes/ServerTypes" 
interface CustomizeTaskInterface {
    taskId: string
}
import {useQuery, gql, useMutation} from "@apollo/client"


const taskMutationQuery = gql`
mutation MutTask($mutTaskId: ID!, $task: taskInp!) {
  mutTask(id: $mutTaskId, task: $task) {
    status
    error
  }
}
`

import {taskQuery1} from "../Queries/Graphql"
const CustomizeTask: React.FC<CustomizeTaskInterface> = ({taskId}) => {
    const taskData = useQuery<{task: Task}>(taskQuery1, {variables: {taskId: taskId}})
    const data = taskData.data?.task
    console.log(taskId, taskData)
    console.log(data?.date)
    const [ dates, setDates ] = useState(data?.date ? new Date(parseInt(data.date)) : new Date())
    const input1Ref = useRef<HTMLInputElement>(null)
    const input2Ref = useRef<HTMLInputElement>(null)
    const input3Ref = useRef<HTMLInputElement>(null)
    const [mutationFunction] = useMutation(taskMutationQuery)
    if(taskData.error || taskData.loading || !data) {
        return <>loading</>
    }
    const {type, shouldTake, date} = data
    const startHour = new Date().getHours()
    const sendMutation = () => {
        const d = new Date(dates)
        const newHour = input2Ref.current?.value
        newHour && d.setHours(parseInt(newHour))
        const timeShouldTake = input3Ref.current?.value

        mutationFunction({variables: {
            mutTaskId: taskId, 
            task: {
                type: input1Ref.current?.value || "", 
                date: d.getTime().toString(),
                shouldTake: timeShouldTake ? parseInt(timeShouldTake) : shouldTake
            }}}
                
        )
    }
    return (
        <div onClick={(e) => {e.stopPropagation()}} className={"CustomizeTaskContainer"} >
            <table>
                <tr>
                    <td>task title: </td><td><input ref={input1Ref} defaultValue={type}/></td>
                </tr>
                <tr>
                    <td>start hour: </td><td><input ref={input2Ref} defaultValue={startHour} type="number" step={1} min={1} max={20} /></td>
                    <td>task length: </td><td><input ref={input3Ref} defaultValue={shouldTake} type="number" step={1} min={1} max={8} /></td>
                </tr>
                <tr>
                    <td>task date: </td>
                    <tr>
                        <DatePicker value={dates} onChange={setDates}/>
                    </tr>
                </tr>
                <button>unassign</button>
                <button onClick={sendMutation}>save</button>
            </table>
        </div>
    )

}

export default CustomizeTask