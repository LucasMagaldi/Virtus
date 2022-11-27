import { object, string, TypeOf } from "zod";

export const createUserSchema =  object({
    body: object({
        firstName: string({
            required_error: "First name is required",
        }),
        lastName: string({
            required_error: "Last name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is too short - must be bigger then 6 chars"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not valid email address")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passcodes do not match",
        path: ["passwordConfirmation"]
    })
});



export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];