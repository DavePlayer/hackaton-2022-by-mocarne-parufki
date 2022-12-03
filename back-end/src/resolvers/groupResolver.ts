import { MongoClient } from "mongodb";

export interface GroupInterface {
    id: String,
    name: String,
    usersIds: [String]
}


export const group = async (id: String) => {
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
                const results = await client!.db("data").collection("groups").find({id});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    return resultsData as Array<GroupInterface>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}

export const groups = async () => {
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
                const results = await client!.db("data").collection("groups").find({});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    if ((resultsData as Array<GroupInterface>).length == 0) throw "Database: no twitch users in database";
                    else return resultsData as Array<GroupInterface>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}

export const groupsWorkers = async (workers: [any]) => {
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
                const results = await client!.db("data").collection("users").find({id: {$in: workers}});
                if (results == null) {
                    throw new Error(`aha XD`);
                } else {
                    const resultsData: unknown = await results.toArray();
                    if ((resultsData as Array<GroupInterface>).length == 0) throw "Database: no twitch users in database";
                    else return resultsData as Array<GroupInterface>;
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("mongo link not existing")
        }
}
