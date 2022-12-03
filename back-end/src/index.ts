import dotenv from 'dotenv'
const { buildSchema } = require('graphql');
import fs from 'fs';
import {resolver} from "./resolvers/parentResolver"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express'
import jwt from "jsonwebtoken"
import { MongoClient } from 'mongodb';
import { workerInterface } from './resolvers/workersResolver';

const authApp = express();
authApp.use(express.json)

authApp.get("/get-token", async (req: express.Request, res: express.Response) => {
  const dataJSON = req.headers.authorization
  if(dataJSON == undefined ) return res.status(400)
  const data = JSON.parse(dataJSON)
  if(data == undefined || data == null) return res.status(400)
  if(data.login == undefined || data.password == undefined || data.login == null || data.password == null) return res.status(400)


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
          const results = await client!.db("data").collection("tasks").find({login: data.login, password: data.password});
          if (results == null) {
              throw new Error(`aha xd`);
          } else {
              const resultsdata: unknown = await results.toArray();
              if ((resultsdata as Array<workerInterface>).length == 0) return res.status(401)
              else return jwt.sign((resultsdata as Array<workerInterface>)[0], process.env.SECRET || "DUNNO")
          }
      } catch (error) {
          throw error;
      }
  } else {
      console.log("mongo link not existing")
  }
})

authApp.get("/auth", async (req: express.Request, res: express.Response) => {
  const dataJSON = req.headers.authorization
  if(dataJSON == undefined ) return res.status(400)
  const data = JSON.parse(dataJSON)
  if(data == undefined || data == null) return res.status(400)
  if(data.login == undefined || data.password == undefined || data.login == null || data.password == null) return res.status(400)

  const veryfication = jwt.verify(data, process.env.SECRET || "DUNNO");

  res.send(veryfication);
})

dotenv.config();
var schema = buildSchema(fs.readFileSync("src/schema.graphql").toString('utf-8'));

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
});

startStandaloneServer(server).then(url => {
  console.log(`🚀 Server ready at`, url);
})
