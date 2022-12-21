import UserModel, { User } from "../models/User";

class UserService {

    async newUser(input: Partial<User>) {
        return UserModel.create(input);
    }

}

export default new UserService();