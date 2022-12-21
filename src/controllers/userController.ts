import { Response, Request } from "express";
import { CreateUserInput } from "../schemas/userSchema";


class UserController {

    async createUser(req: Request<{}, {}, CreateUserInput>, res: Response) {
        const body = req.body

        return res.status(200).json({content: body})
    }

}


export default new UserController();
