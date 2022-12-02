import Calendar from "../Components/Calendar"
import Backdrop from "../Components/Backdrop"
import { useState } from "react"

import { FloatingContainer } from "../Components/FloatingContainer"
import CustomizeTask from "../Components/CustomizeTask"
import { TaskData } from "../commonTypes/Tasks"
import "./tempCalStyle.css"

const CalendarPage = () => {
    const [isBackdropActive, setBackdropActive] = useState(false)
    const [tasks, setTasks] = useState<TaskData[]>(
        [
            {id: "jdjd", name: "task1", day: 2, hours: [8, 9, 10]},
            {id: "djdj", name: "task2", day: 2, hours: [14, 15, 16]}
        ]
    )
    const [ customized, setCustomized ] = useState<TaskData | null>(null)
    const editTask = (taskId: string) => {
        setBackdropActive(true)
        setCustomized(tasks.find(task => task.id == taskId)!)
        console.log(isBackdropActive)

    }
    return (
        <>
            {customized && 
                <FloatingContainer><CustomizeTask taskData={customized} /></FloatingContainer>
            }
            {customized && <Backdrop cancel={() => {
                setBackdropActive(false)
                setCustomized(null)
                }}
                />
            }
            <div className={"CalendarPageContainer"}>
                <Calendar taskData={tasks} editTask={(taskId: string) => editTask(taskId)}/>
            </div>
        </>
        )
}

export default CalendarPage