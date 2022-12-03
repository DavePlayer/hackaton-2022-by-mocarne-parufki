"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
var schema = buildSchema(fs_1.default.readFileSync("src/schema.graphql").toString('utf-8'));
const resolvers = {
    hello: () => "hello world",
    developers: () => [{
            id: "123",
            userName: "test username",
            lastName: "test last"
        }]
};
app.get("/", (req, res) => {
    res.json({ status: "działa" });
});
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));
app.listen(process.env.PORT || 9999, () => console.log(`listening on port: ${process.env.PORT || 9999}`));
