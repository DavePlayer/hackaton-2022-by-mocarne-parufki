import Calendar from "../Components/Calendar"
import { useState, useEffect } from "react"
import {useCookies} from "react-cookie"

import { CompletedTasks } from '../Components/CompletedTasks'
import { Header } from "../Components/Header"
import { FloatingContainer } from "../Components/FloatingContainer"
import CustomizeTask from "../Components/CustomizeTask"
import { TaskData } from "../commonTypes/Tasks"
import "./tempCalStyle.css"
import { ProjectSelector } from '../Components/ProjectSelector'
import UnassignedTaskList from "../Components/UnassignedTasks"
import { Projekt } from "../commonTypes/ServerTypes"

interface CalendarPageInterface {
    activateBackdrop: () => void
    isBackdropActive: boolean
    setBackdropActive: React.Dispatch<React.SetStateAction<boolean>>
}
import {useQuery, gql} from "@apollo/client"

import { Task, workerData } from "../commonTypes/ServerTypes"
import { workerQuery } from "../Queries/Graphql"
const CalendarPage: React.FC<CalendarPageInterface> = ({isBackdropActive, activateBackdrop, setBackdropActive}) => {
    const [cookies] = useCookies()
    const workerId = cookies["jwt"]
    if(!cookies["jwt"]) {
        return <>err</>
    }
    console.log(workerId)
    const user = useQuery<{worker: workerData}>(workerQuery, {variables: {id: workerId}})
    const [ customized, setCustomized ] = useState<string | null>(null)
    const editTask = (taskId: string) => {
        activateBackdrop()
        setCustomized(taskId)
    }
    const [ sidePanelExpanded, setSidePanelExpanded ] = useState(false)

    const isAdmin = user.data?.worker.role == "Admin"
    const [ sidePanelProjectId, setSidePanelProjectId ] = useState<string>("") 
    return (
        <>
            {isBackdropActive && customized && 
                <FloatingContainer>
                    <CustomizeTask setBackdropActive={setBackdropActive} taskId={customized} />
                </FloatingContainer>
            }
            <div className={"CalendarPageContainer"}>
                <div className={"topPanel"}>
                    <Header ></Header>
                </div>
                <div className={"midPanel"}>
                    <div className={"SidePanelLeft"}>
                        <ProjectSelector setProject={(s: string) => setSidePanelProjectId(s)} />
                        <UnassignedTaskList 
                            isAdmin={isAdmin}
                            editTask={(taskId: string) => editTask(taskId)}
                        />
                    </div>
                    <Calendar editTask={(taskId: string) => editTask(taskId)}/>
                    <div className={["SidePanelRight", sidePanelExpanded ? "SidePanelExpanded" : ""].join(" ")}>
                        <CompletedTasks toggle={() => setSidePanelExpanded(v => !v)}/>
                    </div>
                </div>
            </div>
        </>
        )
}

export default CalendarPage