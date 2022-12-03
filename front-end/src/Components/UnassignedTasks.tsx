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

const UnassignedTask: React.FC<{task: Task, customize: () => void}> = ({task, customize}) => {
    return (
        <div 
            onClick={customize}
            style={{background: "red", marginTop: "1rem", cursor: "pointer"}}
        >
            {task.type}
        </div>
    )
}
import {Task} from "../commonTypes/ServerTypes"

import {useQuery} from "@apollo/client"
import {taskQuery2} from "../Queries/Graphql"
const UnassignedTaskList: React.FC<{editTask: (v: string) => void, isAdmin: boolean}> = ({editTask, isAdmin}) => {    
    const tasks = useQuery<{tasks: Task[]}>(taskQuery2)
    return (
        <>
        {tasks.data?.tasks.filter(v => v.date == null).map((v) => 
            <UnassignedTask task={v} customize={() => editTask(v.id)} />
        )}
        </>
    )
}

export default UnassignedTaskList