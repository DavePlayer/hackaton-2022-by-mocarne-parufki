import { useEffect, useState } from "react"
import { TaskData } from "../commonTypes/Tasks"
const fakeFetch = () => {
    return [
            {id: "jdjd", projectId: "k2", name: "task1", day: 2, hours: [8, 10], fulldate: ""},
            {id: "djdj", projectId: "k2", name: "task2", day: 3, hours: [14, 20], fulldate: ""},
            {id: "djd", projectId: "k2", name: "task2", day: 1, hours: [14, 20], fulldate: ""},
            {id: "djd", projectId: "k2", name: "task2", day: 1, hours: [4, 6], fulldate: ""},
        ] 
}

const UnassignedTask: React.FC<{task: TaskData, customize: () => void}> = ({task, customize}) => {
    return (
        <div 
            onClick={customize}
            style={{background: "red", marginTop: "1rem", cursor: "pointer"}}
        >
            {task.name}
        </div>
    )
}

const UnassignedTaskList: React.FC<{tasks: TaskData[], editTask: (v: string) => void}> = ({tasks, editTask}) => {    
    return (
        <>
        {tasks.map((v) => 
            <UnassignedTask task={v} customize={() => editTask(v.id)} />
        )}
        </>
    )
}

export default UnassignedTaskList