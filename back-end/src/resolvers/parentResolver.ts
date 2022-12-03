import {groups, groupsWorkers, GroupInterface, group} from "./groupResolver"
import { project, projectInterface, projects, projectsByIDArray } from "./projectsResolver";
import { task, tasks, taskByWorkerId, tasksByIdArray, updateTaskById, taskById } from "./tasksResolver";
import {workers, worker, workerInterface} from "./workersResolver"

export const resolver = {
    Query: {
        groups,
        group: async (parent: any, args: {id: String}) => {
            console.log(args)
            return group(args.id);
        },
        workers,
        worker: async (parent:any, args: {id: String}) => {
            console.log("query worker by id: ", args)
            return await worker(args);
        },
        tasks: async (parent: any, args: {id: String}) => {
            console.log(args)
            if(args.id == undefined) return await tasks()
            return taskByWorkerId(args.id);
        },
        task: async (parent: any, args: {id: String}) => {
            console.log(args)
            if(args.id == undefined) return await tasks()
            const taskk = await taskById(args.id);
            console.log("taskkk", taskk);
            return  taskk
        },

        projects,
        project: async (parent: any, args: {id: String}) => {
            console.log(args)
            return project(args.id);
        },
    },
    Mutation: {
        mutTask: async (parent:any, args: {id: String, task: task}) => {
            console.log(`editing task: `, args)
            return await updateTaskById(args)
        }
    },
    group: {
        workers: async (parent: GroupInterface) => {
            const id = parent.usersIds
            const users = await groupsWorkers(id)
            return users
        }
    },
    worker: {
        assignedTasks: async (parent: workerInterface) => {
            if(parent.assignedTasks.length == 0) return [];
            return await tasksByIdArray(parent.assignedTasks);
        },
        projects: async (parent: workerInterface) => {
            console.log("worker projects parent: ", parent)
            if(parent.projects.length == 0) return [];
            return await projectsByIDArray(parent.projects);
        },
        Group: async (parent: workerInterface) => {
            console.log(`|${parent.group}|`)
            const gr = await group(parent.group);
            console.log("found group: ", gr)
            return gr!.length > 0 ? gr![0] : null
        }
    },
    task: {
        worker: async (parent: task) => {
            const id = parent.worker
            console.log("searching for user: ", id)
            if(id == null) return null
            else {
                const workers = await worker({id})
                return workers
            }
        },
        project: async (parent: task) => {
            const id = parent.project
            console.log("searching for project: ", parent)
            if(id == null) return null
            else {
                const ans = await project(parent.project);
                console.log("found project: ", ans);
                return ans![0]
            }
        },
    },
    project: {
        tasks: async (parent: projectInterface) => {
            return tasksByIdArray(parent.tasks)            
        }
    },
}