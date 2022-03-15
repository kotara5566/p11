import fs from "fs"
import path from "path"
import getUser from "../utils/getUser"
import { ApolloServer } from 'apollo-server-express';
import dotenv from "dotenv";
dotenv.config();

import resolvers from "./resolvers";
//import typeDefs from './schema/typeDefs';
const typeDefs = fs
    .readFileSync(path.join(__dirname, "./schema", "schema.graphql"), "utf8")
    .toString()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {    
        reportSchema: true,
        graphVariant: "current"
    },
    introspection: true,
    playground: true,
    tracing: true,
    // apollo: process.env.APOLLO_KEY,
    context: ({ req }) => {
        //Check token from headers
        const token = req.headers.authorization || ""
        
        // Extract userId from token
        const userId = getUser(token)

        // console.log('User ID : ',userId)
        return { userId }
    }
})

export default server