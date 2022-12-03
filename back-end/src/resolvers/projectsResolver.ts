
import { MongoClient } from "mongodb";

export interface projectInterface {
    id: String,
    tasks: [String],
    name: String,
    group: String,
    deadLine: String,
}


export const projects = async () => {
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
                const results = await client!.db("data").collection("projects").find({});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    return resultsData as Array<projectInterface>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}

export const project = async (id: String) => {
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
                const results = await client!.db("data").collection("projects").find({id});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    return resultsData as Array<projectInterface>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}

export const projectsByIDArray = async (idArr: Array<String>) => {
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
                const results = await client!.db("data").collection("projects").find({id: {$in: idArr}});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    return resultsData as Array<projectInterface>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}