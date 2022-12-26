import { Response, Request } from "express";
import { CreateUserInput, VerifyUserInput } from "../schemas/userSchema";
import sendEmail from "../utils/mailer";
import UserService from "../services/userService";
import { User } from "../models/User";

class UserController {

    async createUser(req: Request<{}, {}, CreateUserInput>, res: Response) {
        try {
            const body = req.body
            const user = await UserService.newUser(body);

            await sendEmail({
                to: "lucas.magaldi@hotmail.com",
                from: "lucas.magaldi@hotmail.com",
                subject: "Verify Node test",
                text: `Verification code: ${user.verificationCode} and id: ${user._id}`
            });
            return res.status(200).json({content: body})
        } catch (error: any) {
            if(error.code === 11000) {
                return res.status(409).json({
                    content: "Email already register"
                })
            }
        }     
    }

    async verifyUser(req: Request<VerifyUserInput>, res: Response) {
        try {
            console.log(req)
            const { id, verificationCode } = req.params;
            const user = await UserService.findUserById(id)

            if(!user) {
                return res.status(404).json({
                    content: "Could not verify user"
                })
            }

            if(user.verified) {
                return res.status(401).json({
                    content: "Already verified"
                })
            }

            if(user.verificationCode === verificationCode) {
                user.verified = true;
                await user.save()

                return res.status(200).json({
                    content: "Validation successfuly"
                })
            }    
        } catch (error) {
            console.log(error);
            return res.send(error)
        }
    }

}


export default new UserController();
