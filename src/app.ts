import express, { Express } from "express";
import routes from "./routes";

class App {
    server: Express

    constructor() {
        this.server = express();
        this.AllowJson();
        routes(this.server);
    }

    AllowJson():void {
        this.server.use(express.json());
    }
}


export default new App().server