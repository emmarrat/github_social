import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import config from "./config";
import usersRouter from "./routers/users";
import repositoriesRouter from "./routers/repositories";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/repos', repositoriesRouter);

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    app.listen(port, () => {
        console.log('We are live on' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);

