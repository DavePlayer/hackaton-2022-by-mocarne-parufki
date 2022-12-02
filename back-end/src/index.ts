import express from 'express'
import dotenv from 'dotenv'
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
import fs from 'fs';

dotenv.config();


const app = express();
app.use(express.json());
var schema = buildSchema(fs.readFileSync("src/schema.graphql").toString('utf-8'));

const resolvers = {
    hello: () => "hello world",
    developers: () => [{
    id: "123",
    userName: "test username",
    lastName: "test last"
    }]
}


app.get("/", (req: express.Request, res: express.Response) => {
    res.json({status: "działa"})
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));


app.listen(process.env.PORT || 9999, () => console.log(`listening on port: ${process.env.PORT || 9999}`))