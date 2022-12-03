import {} from "uuid"

/*
type ID = string;
type Query = {
    groups: [group]!
    group(id: ID!): [group]!
    workers: [worker]!
    worker(id: ID!): worker!
    tasks(workerId: ID): [task]!

    project(id: ID!): project!
    projects: [project]!
  }
  type worker = {
    id: ID!
    role: String!
    userName: String!
    lastName: String!
    projects: [project]!
    Group: group!
    assignedTasks: [task]!
  }
  type task = {
    id: ID!
    type: String!
    project: project!
    worker: worker
    date: String!
    TimeItTook: String
    private: Boolean!
    IsPermanent: Boolean!
  }
  type project = {
    id: ID!
    tasks: [task]!
    name: String!
    group: group!
    deadLine: String!
  }
  type group = {
    id: ID!
    name: String
    workers: [worker]! 
    projects: [project]!
  }
  */
export type Task = {
    id: string
    type: string
    project: string
    worker: string
    date: string
    TimeItTook: string
    private: boolean
    IsPermanent: boolean
    shouldTake: number
  }

export type Projekt = {
    id: string
    tasks: Task[]
    name: string
    group: string
    deadLine: string
}
export type workerData = {
    id: string,
    lastName: string,
    projects: Projekt[]
}