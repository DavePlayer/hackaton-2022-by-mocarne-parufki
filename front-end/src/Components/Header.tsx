import React, { useEffect, useState } from 'react'
import {useQuery, gql} from "@apollo/client"
import { workerQuery } from '../Queries/Graphql'
import { useCookies } from 'react-cookie'


export const Header: React.FC = () => {
  const query = gql`
    query getWorker($id: ID!) {
      worker(id: $id) {
        userName
        lastName
  }}
  `
    const [cookies] = useCookies()
    const workerId: String = cookies["jwt"]
    const data = useQuery(query, {variables: {id: workerId}})
    console.log("usernames: ",data)

    return (
        <div className="container-fluid menu-container">
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{height: "100%"}}>
          <div className="d-flex">
            <img className="navbar-brand logo flex-row" src="static/logo.png" />
            {
              data.loading == false && <div className="imie-nazw d-flex align-items-center">{data.data.worker.userName} {data.data.worker.lastName}</div>
            }
          </div>
        </nav>
      </div>

    )
}