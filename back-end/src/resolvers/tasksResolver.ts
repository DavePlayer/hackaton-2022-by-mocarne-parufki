import { MongoClient } from "mongodb";

export interface task {
    id: String,
    type: String,
    project: String,
    worker: String | null,
    date: String,
    TimeItTook: String | null,
    private: Boolean,
    IsPermanent: Boolean
}

export const tasks = async () => {
        const mongoLink = process.env.MONGOLINK || null;
        console.log("connecting to db");
        if (mongoLink) {
            const client = new MongoClient(mongoLink);
            try {
                await client.connect();
                console.log("established connection");
            } catch (err) {
                console.error(`Database: \n${err}`);
            }
            try {
                const results = await client!.db("data").collection("tasks").find({});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    if ((resultsData as Array<task>).length == 0) throw "Database: no twitch users in database";
                    else return resultsData as Array<task>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }


}


export const taskByWorkerId = async (id: String) => {
        const mongolink = process.env.mongolink || null;
        console.log("connecting to db");
        if (mongolink) {
            const client = new MongoClient(mongolink);
            try {
                await client.connect();
                console.log("established connection");
            } catch (err) {
                console.error(`database: \n${err}`);
            }
            try {
                const results = await client!.db("data").collection("tasks").find({id});
                if (results == null) {
                    throw new Error(`aha xd`);
                } else {
                    const resultsdata: unknown = await results.toArray();
                    if ((resultsdata as Array<task>).length == 0) throw "database: no twitch users in database";
                    else return resultsdata as Array<task>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}


export const tasksByIdArray = async (idArray: Array<String>) => {
    const mongoLink = process.env.MONGOLINK || null;
    console.log("connecting to db");
    if (mongoLink) {
        const client = new MongoClient(mongoLink);
        try {
            await client.connect();
            console.log("established connection");
        } catch (err) {
            console.error(`Database: \n${err}`);
        }
        try {
            const results = await client!.db("data").collection("tasks").find({id: {$in: idArray}});
            if (results == null) {
                throw new Error(`aha XD`);
            } else {
                const resultsData: unknown = await results.toArray();
                if ((resultsData as Array<task>).length == 0) throw "Database: no twitch users in database";
                else return resultsData as Array<task>;
            }
        } catch (error) {
            throw error;
        }
    } else {
        console.log("mongo link not existing")
    }
}


export const updateTaskById = async ({task, id}: {task: task, id: String}) => {
    const mongoLink = process.env.MONGOLINK || null;
    console.log("connecting to db");
    if (mongoLink) {
        const client = new MongoClient(mongoLink);
        try {
            await client.connect();
            console.log("established connection");
        } catch (err) {
            console.error(`Database: \n${err}`);
        }
        try {
            const results = await client!.db("data").collection("tasks").updateOne({id}, {$set: task})
            if (results == null) {
                throw new Error(`aha XD`);
            } else {
                const resultsData: unknown = await results.modifiedCount
                if (resultsData == false) throw "no match for specified task id";
                else return {status: "chyna kurwa ok. nie wiem"};
            }
        } catch (error) {
            throw error;
        }
    } else {
        console.log("mongo link not existing")
    }
}