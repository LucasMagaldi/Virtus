import { Response, Request } from "express";
import { CreateUserInput, VerifyUserInput, forgetPasswordInput } from "../schemas/userSchema";
import sendEmail from "../utils/mailer";
import UserService from "../services/userService";


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
    
    async forgetPassword(req: Request<{}, {}, forgetPasswordInput>, res: Response) {
        let message = "Password reset code will be send to registered email address"
        try {
            const {email} = req.body;
            const user = await UserService.findUserByEmail(email);

            if(!user) {
                return res.status(400).json({
                    content: message
                })
            }

            if(!user.verified) {
                return res.status(403).json({
                    content: "You are not verified yet"
                })
            }
            const passwordCode = Math.ceil(Math.random() * 100000);
            user.passwordResetCode = passwordCode.toString();
            
            await user.save();
            await sendEmail({
                to: user.email,
                from: "lucas.magaldi@hotmail.com",
                subject: "Reset your password",
                text: `Password reset code: ${passwordCode}. Id ${user._id}`,
            });
            return res.status(200).json({
                content: message
            });
        } catch (error) {
            message = ""
            res.status(409).json({
                content: message
            });
        }      
    }

}


export default new UserController();
