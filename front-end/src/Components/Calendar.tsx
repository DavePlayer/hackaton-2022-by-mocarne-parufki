import "./tempCalendarStyle.css"
import { useState } from "react"

type HourData = {
    task?: string
    prompt?: string
    color?: number[]
    change?: () => void
}

interface HourInterface {
    hourData: HourData
}



const Hour: React.FC<HourInterface> = ({hourData}) => {
    const {task, color, change} = hourData
    const style = task ?
        {border: "none", background: "green", cursor: "pointer"} : {}
    return (
        <td
            onClick={change}
            className={"callendarTableCell"} 
            style={style}
        >
        </td>
    )
}


const transposed = (arr: any[][]) => {
    const newArr = new Array<HourData[]>(24)
                    .fill([])
                    .map(v => 
                        new Array<HourData | null>(7)
                        .fill(null)
                        .map(v => ({})
                    ))
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr[i].length; j++) {
            newArr[j][i] = arr[i][j]
        }
    }
    return newArr
}

interface CalendarComponentInterface {
    editTask: (taskId: string) => void
}


import {Task, workerData} from "../commonTypes/ServerTypes"
import {useQuery} from "@apollo/client"
import {taskQuery2} from "../Queries/Graphql"
import { workerQuery } from "../Queries/Graphql"
import {useCookies} from "react-cookie"

const Calendar: React.FC<CalendarComponentInterface> = ({editTask}) => {
    const [cookies] = useCookies()
    const workerId = cookies["jwt"]
    console.log(workerId)
    const user = useQuery<{worker: workerData}>(workerQuery, {variables: {id: workerId}})
    const proj = user.data?.worker.projects || []
    const taskdata = proj.map(v => v.tasks).flat()


    const weekData = new Array<HourData[]>(7)
    for(let i = 0; i < 7; i++) {
        weekData[i] = []
        for (let j = 0; j < 24; j++) {
            weekData[i].push({})

        }
    }
    for (let task of taskdata) {
        const date = new Date()
        const dayOfTheWeek = date.getDay()
        const start = date.getHours()
        for (let hour = start; hour < start + task.shouldTake; hour++) {
            weekData[dayOfTheWeek][hour].task = task.type
            weekData[dayOfTheWeek][hour].change = () => editTask(task.id)
            
        }
    }
    return (
        <div className={"calendarContainer"}>
            <table style={{borderSpacing: "0"}}>
                <thead>
                    <tr>
                        <th>monday</th>
                        <th>tuesday</th>
                        <th>wednesday</th>
                        <th>thrusday</th>
                        <th>friday</th>
                        <th>saturday</th>
                        <th>sunday</th>
                    </tr>
                </thead>
                <tbody style={{}}>
                    {transposed(weekData).map((weekDay, dayIdx) => 
                        <tr>
                            {weekDay.map((hourData, hourIdx) => 
                                <Hour 
                                    key={`calendar_${dayIdx}:${hourIdx}`} hourData={hourData}
                                />
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        )
}

export default Calendar