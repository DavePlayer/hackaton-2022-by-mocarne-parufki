import { MongoClient } from "mongodb";

export interface workerInterface {
    id: String,
    role: String
    userName: String
    lastName: String
    projects: Array<String>,
    assignedTasks: Array<String>,
    group: String,
}

export const workers = async () => {
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
                const results = await client!.db("data").collection("users").find({});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    if ((resultsData as Array<workerInterface>).length == 0) throw "Database: no twitch users in database";
                    else return resultsData as Array<workerInterface>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}

export const worker = async ({id}: {id: String}) => {
        const mongoLink = process.env.MONGOLINK || null;
        console.log("connecting to db", id);
        if (mongoLink) {
            const client = new MongoClient(mongoLink);
            try {
                await client.connect();
                console.log("established connection");
            } catch (err) {
                console.error(`Database: \n${err}`);
            }
            try {
                const results = await client!.db("data").collection("users").find({id});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    console.log(resultsData)
                    return (resultsData as Array<workerInterface>)[0] as workerInterface;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}