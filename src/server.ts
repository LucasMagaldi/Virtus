import App from './app';
import dotenv from 'dotenv';
import connectDB from './db/connection';
import os from 'os';
import log from './utils/logger';
import config from '.././config/default';
dotenv.config();


const port = config.port;
const cpu = os.cpus().length;


const startAtlas = async() => {
    try {
        await connectDB(12);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

App.listen(port, () => {
    log.info(`RUNNING IN ${port}`);
    log.info(`PLAY WITH ${cpu} CORES`);
 
})