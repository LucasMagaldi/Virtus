import express, { Express } from "express";
import routes from "./routes";

class App {
    server: Express

    constructor() {
        this.server = express();
        routes(this.server);
    }
}


export default new App().server