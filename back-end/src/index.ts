import dotenv from 'dotenv'
const { buildSchema } = require('graphql');
import fs from 'fs';
import {resolver} from "./resolvers/parentResolver"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';



dotenv.config();
var schema = buildSchema(fs.readFileSync("src/schema.graphql").toString('utf-8'));

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
});

startStandaloneServer(server).then(url => {
  console.log(`🚀 Server ready at`, url);
})
