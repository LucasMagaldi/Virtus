import { Router, Express, Request, Response } from "express";

function routes(app: Express) {
    app.get("/test", (req: Request, res: Response) => {
        return res.status(201).json({response:"Success"});
    })
}

export default routes;