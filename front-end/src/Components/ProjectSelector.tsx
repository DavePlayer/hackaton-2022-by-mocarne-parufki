import React from 'react'
import {useQuery, gql} from "@apollo/client"
import { useCookies } from "react-cookie"
import { workerData } from '../commonTypes/ServerTypes'

import { workerQuery } from '../Queries/Graphql'

export const ProjectSelector: React.FC<{setProject: (projectId: string) => void}> = ({setProject}) => {
    const [cookies] = useCookies()
    const workerId = cookies["jwt"]
    const user = useQuery<{worker: workerData}>(workerQuery, {variables: {id: workerId}})
    const proj = user.data?.worker.projects || []
    return (
        <aside className="col l-col" >
            <select onChange={(v => setProject(v.target.value))} className="lista1" name="project" id="project">
              <option disabled value="null" style={{display: "none"}}>Wybierz projekt</option>
              {proj.map(v => 
                <option value={v.id} >{v.name}</option>
              )}
            </select>
          </aside>
    )
}