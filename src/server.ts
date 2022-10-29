import App from './app';
import dotenv from 'dotenv';
import connectDB from './db/connection';
import os from 'os';

const port = process.env.PORT;
const cpu = os.cpus().length;

dotenv.config();

const startAtlas = async() => {
    try {
        await connectDB(12);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

App.listen(port , () => {
    console.log(`RUNNING IN ${port}`);
    console.log(`PLAY WITH ${cpu} CORES`);

    startAtlas();
})