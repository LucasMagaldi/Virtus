import UserModel, { User } from "../models/User";

class UserService {

    async newUser(input: Partial<User>) {
        return UserModel.create(input);
    }

    async findUserById(id: string) {
        return UserModel.findById(id)
    }

}

export default new UserService();