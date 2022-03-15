import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from "mongoose";
import server from "./server";

const PORT = process.env.PORT || 9000;

const createServer = async () => {
    try {
    await mongoose.connect(
        `mongodb+srv://pakky1234:yj5Zsz8lxmVgw3JP@cluster0.bnxmz.mongodb.net/server?retryWrites=true&w=majority`,
        { useUnifiedTopology: true }
    )
    
        const app = express();

        server.start() .then(res => {
            server.applyMiddleware({ app });
            app.listen({ port : PORT }, () =>    
                console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`)
                );
            })
    console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log (error)
        }
    }
    createServer()



