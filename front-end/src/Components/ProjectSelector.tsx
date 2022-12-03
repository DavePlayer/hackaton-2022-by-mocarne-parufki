import React, { useEffect, useState } from 'react'
import {useQuery, gql} from "@apollo/client"
import { useCookies } from "react-cookie"
import { workerData } from '../commonTypes/ServerTypes'
import {taskInterface, WraperForUnsignedTasks} from './wraper/wraperForUnsignedTasks'
import "./tempSelectorStyle.css"
import { workerQuery } from '../Queries/Graphql'

export const ProjectSelector: React.FC = () => {
    const [ sidePanelProjectId, setSidePanelProjectId ] = useState<string>("123") 
    const [ showWrapper, setShowWrapper ] = useState<boolean>(false);
    const [ taskToEdit, setTaskToEdit ] = useState<taskInterface>();
      const [cookies] = useCookies()
      const workerId = cookies["jwt"]
      const user = useQuery<{worker: any}>(workerQuery, {variables: {id: workerId}})
    return (
        <aside className="" >
            <select onChange={(v => setProject(v.target.value))} className="lista1" name="project" id="project">
              <option disabled value="null" style={{display: "none"}}>Wybierz projekt</option>
              {!user.loading ? 
              user.data?.worker.projects.map((v: { id: string | number | readonly string[] | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => <option value={v.id} >{v.name}</option>)
                :
                <option value="loading">loading</option>
              }
            </select>
            {showWrapper && <WraperForUnsignedTasks close={setShowWrapper} task={taskToEdit || {id: "none", date: "none", IsPermanent: false, private: false, shouldTake: 5, TimeItTook: "5", type: "das", worker: null}} />}
            <section className='unasigned-tasks'>
              {
                !user.loading && 
                user.data?.worker.projects[0].tasks.filter((el: any) => el.worker == null).map((el:any) => <div onClick={() => {setTaskToEdit(el); setShowWrapper(true)}} className='unsigned-task'>{el.type}</div>)
              }
            </section>
          </aside>
    )
}

function setProject(value: string): void {
  throw new Error('Function not implemented.')
}
