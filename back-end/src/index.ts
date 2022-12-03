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
authApp.use(express.json())

authApp.get("/get-token", async (req: express.Request, res: express.Response) => {
  console.log(req.headers)
  const dataJSON = req.headers.authorization
  if(dataJSON == undefined ) res.status(400).send("no data parsed")
  console.log(dataJSON)
  const data = JSON.parse(dataJSON!)
  if(data == undefined || data == null)  res.status(400).send("invalid data format")
  if(data.login == undefined || data.password == undefined || data.login == null || data.password == null) res.send("not so easy hacky boy ")
  console.log()


  const mongolink = process.env.MONGOLINK || null;
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
          const results = await client!.db("data").collection("users").find({login: data.login, password: data.password});
          if (results == null) {
              throw new Error(`aha xd`);
          } else {
              const resultsdata: unknown = await results.toArray();
              if ((resultsdata as Array<workerInterface>).length == 0) return res.status(401)
              res.json({token: jwt.sign((resultsdata as Array<workerInterface>)[0].id, process.env.SECRET || "DUNNO")})
          }
      } catch (error) {
          throw error;
      }
  } else {
      console.log("mongo link not existing")
  }
})

authApp.get("/auth", async (req: express.Request, res: express.Response) => {
  console.log(req.headers)
  const dataJSON = req.headers.authorization
  if(dataJSON == undefined ) res.status(400).send("no data parsed")
  console.log(dataJSON)
  const data = JSON.parse(dataJSON!)
  if(data == undefined || data == null)  res.status(400).send("invalid data format")
  if(data.token == null || data.token == undefined) res.send("not so easy hacky boy ")

  const veryfication = jwt.verify(data.token, process.env.SECRET || "DUNNO");

  res.send(veryfication);
})

authApp.listen(process.env.PORT || 8080, () => console.log(`listening on port ${process.env.PORT || 8080}`))

dotenv.config();
var schema = buildSchema(fs.readFileSync("src/schema.graphql").toString('utf-8'));

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
});

startStandaloneServer(server).then(url => {
  console.log(`🚀 Server ready at`, url);
})
