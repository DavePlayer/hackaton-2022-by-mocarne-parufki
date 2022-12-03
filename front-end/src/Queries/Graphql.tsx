import {gql} from "@apollo/client"

export const projQuery = gql`query {
    projects {
        name,
        id,
    }
}`

export const taskQuery = gql`query Tasks {
    tasks {
    id
    type
    date
    IsPermanent
    }
}`
export const taskQuery2 = gql`
query Tasks {
  tasks {
    id
    date
    TimeItTook
    IsPermanent
    private
    type
    worker {
      id
    }
    shouldTake
  }
}
`

export const workerQuery = gql`
query getWorker($id: ID!) {
  worker(id: $id) {
    id
    lastName
    role
    projects {
      tasks { 
        date
        TimeItTook
        IsPermanent
        id
        shouldTake
        type
        private
      }
      name
      id
      deadLine
    }
  }
}

`

export const taskQuery1 = gql`
query($taskId: ID!) {
  task(id: $taskId) {
    id
    date
    TimeItTook
    IsPermanent
    private
    shouldTake
    type
  }
}
`