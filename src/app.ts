import express, { Express } from "express";

class App {
    server: Express

    constructor() {
        this.server = express();
    }
}


export default new App().server