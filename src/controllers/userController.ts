import { Response, Request } from "express";
import { CreateUserInput } from "../schemas/userSchema";
import sendEmail from "../utils/mailer";
import UserService from "../services/userService";

class UserController {

    async createUser(req: Request<{}, {}, CreateUserInput>, res: Response) {
        const body = req.body
        await UserService.newUser(body);

        await sendEmail({
            to: "lucas.magaldi@hotmail.com",
            from: "lucas.magaldi@hotmail.com",
            subject: "Verify Node test",
            text: "Test"
        });
        return res.status(200).json({content: body})
    }

}


export default new UserController();
