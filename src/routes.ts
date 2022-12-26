import { Router, Express, Request, Response } from "express";
import validateResource from "./middlewares/validateResources";
import { createUserSchema, verifyUserSchema } from "./schemas/userSchema";

import userController from "./controllers/userController";

function routes(app: Express) {
    app.get("/test", (req: Request, res: Response) => {
        return res.status(201).json({response:"Success"});
    });

    app.post("/api/users", validateResource(createUserSchema), userController.createUser)
    app.get("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), userController.verifyUser);
}

export default routes;