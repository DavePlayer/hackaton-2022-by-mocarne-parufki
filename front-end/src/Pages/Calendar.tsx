import Calendar from "../Components/Calendar"
import Backdrop from "../Components/Backdrop"
import { useState, useEffect } from "react"

import { FloatingContainer } from "../Components/FloatingContainer"
import CustomizeTask from "../Components/CustomizeTask"
import { TaskData } from "../commonTypes/Tasks"
import "./tempCalStyle.css"
import UnassignedTaskList from "../Components/UnassignedTasks"

interface CalendarPageInterface {
    activateBackdrop: () => void
    isBackdropActive: boolean
}

const fakeFetch = () => {
    return [
            {id: "jdjd", projectId: "k2", name: "task1", day: 2, hours: [8, 10], fulldate: ""},
            {id: "djdj", projectId: "k2", name: "task2", day: 3, hours: [14, 20], fulldate: ""},
            {id: "djd", projectId: "k2", name: "task2", day: 1, hours: [14, 20], fulldate: ""},
            {id: "djd", projectId: "k2", name: "task2", day: 1, hours: [4, 6], fulldate: ""},
        ] 
}

const CalendarPage: React.FC<CalendarPageInterface> = ({isBackdropActive, activateBackdrop}) => {
    const [tasks, setTasks] = useState<TaskData[]>([])

    const [unassignedTasks, setUnassignedTasks] = useState<TaskData[]>([])
    useEffect(() => {
        setTasks(fakeFetch())
        setUnassignedTasks(fakeFetch())
    }, [])
    const [ customized, setCustomized ] = useState<TaskData | null>(null)
    const editTask = (taskId: string) => {
        activateBackdrop()
        setCustomized(tasks.find(task => task.id == taskId)!)
    }
    return (
        <>
            {isBackdropActive && customized && 
                <FloatingContainer><CustomizeTask taskData={customized} /></FloatingContainer>
            }
            <div className={"CalendarPageContainer"}>
                <div className={"topPanel"}>
                    jdjd
                </div>
                <div className={"midPanel"}>
                    <div className={"SidePanel"}>
                        <UnassignedTaskList tasks={unassignedTasks} editTask={(taskId: string) => editTask(taskId)}/>
                    </div>
                    <Calendar taskData={tasks} editTask={(taskId: string) => editTask(taskId)}/>
                    <div className={"SidePanel"}>
                        jdjd
                    </div>
                </div>
            </div>
        </>
        )
}

export default CalendarPage