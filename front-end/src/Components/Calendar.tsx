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

import { TaskData } from "../commonTypes/Tasks"

interface CalendarComponentInterface {
    taskData: TaskData[],
    editTask: (taskId: string) => void
}


const Calendar: React.FC<CalendarComponentInterface> = ({taskData, editTask}) => {
    const weekData = new Array<HourData[]>(7)
    for(let i = 0; i < 7; i++) {
        weekData[i] = []
        for (let j = 0; j < 24; j++) {
            weekData[i].push({})

        }
    }

    for (let task of taskData) {
        for (let hour of task.hours) {
            weekData[task.day][hour].task = task.name
            weekData[task.day][hour].change = () => editTask(task.id)
            
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