import { ListDatabasesResult, MongoClient } from "mongodb";

interface GroupInterface {
    id: String,
    name: String,
    userIds: [String]
}

class DatabaseC {
    mongoLink: string | null;
    client: MongoClient | null;

    constructor() {
        this.mongoLink = null;
        this.client = null;
    }

    establishConnection = async (mongoString?: string) => {
        this.mongoLink = mongoString || null;
        if (this.mongoLink) {
            this.client = new MongoClient(this.mongoLink);
            try {
                await this.client.connect();
            } catch (err) {
                console.error(`Database: \n${err}`);
            }
        }
    };

    validateCollection = (collectionName: string): Promise<any> =>
        new Promise((res, rej) => {
            this.client!
                .db("data")
                .listCollections({ name: collectionName })
                .next((err, collinfo) => {
                    if (!err) {
                        if (collinfo == null) {
                            this.client!
                                .db("data")
                                .createCollection(collectionName)
                                .then(() => {
                                    console.log(`Database: collection ${collectionName} created`);
                                    res(collectionName);
                                })
                                .catch((err) => rej(err));
                        } else {
                            console.log(`Database: collection ${collectionName} exists`);
                            res(collectionName);
                        }
                    } else {
                        console.log(err);
                        rej(err);
                    }
                });
        });


    insertTwitchUser = async (user: any) => {
        try {
            const collectionName = await this.validateCollection("twitch-users");
            const result = await this.client!.db("data").collection(collectionName).insertOne(user);
            if (result == null) {
                throw new Error(`Database: couldn't insert user`);
            } else return result;
        } catch (error) {
            throw error;
        }
    };
    getGroups = async () => {
        try {
            const collectionName = await this.validateCollection("groups");
            const results = await this.client!.db("data").collection(collectionName).find({});
            if (results == null) {
                throw new Error(`aha XD`);
            } else {
                const resultsData: unknown = await results.toArray();
                if ((resultsData as Array<GroupInterface>).length == 0) throw "Database: no twitch users in database";
                else return resultsData;
            }
        } catch (error) {
            throw error;
        }
    };
}

export default new DatabaseC();