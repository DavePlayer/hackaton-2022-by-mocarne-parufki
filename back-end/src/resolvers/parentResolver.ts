import {groups, groupsWorkers, GroupInterface, group} from "./groupResolver"
import { project, projectInterface, projects, projectsByIDArray } from "./projectsResolver";
import { task, tasks, taskByWorkerId, tasksByIdArray } from "./tasksResolver";
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
            return await worker(args);
        },
        tasks: async (parent: any, args: {workerId: String}) => {
            console.log(args)
            if(args.workerId == undefined) return await tasks()
            return taskByWorkerId(args.workerId);
        },
        projects,
        project: async (parent: any, args: {id: String}) => {
            console.log(args)
            return project(args.id);
        },
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
        }
    },
    project: {
        tasks: async (parent: projectInterface) => {
            return tasksByIdArray(parent.tasks)            
        }
    },
}