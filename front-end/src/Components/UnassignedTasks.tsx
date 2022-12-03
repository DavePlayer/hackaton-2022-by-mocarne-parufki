
const UnassignedTask: React.FC<{task: Task, customize: () => void}> = ({task, customize}) => {
    return (
        <div 
            onClick={customize}
            style={{background: "#495057;", marginTop: "1rem", cursor: "pointer"}}
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