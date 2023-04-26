import {User} from "../enitity/user";


class UserService {
    constructor() {
    }

    getAll = async () => {
        let users = await User.find();
        return users;
    }

    checkUser = async (user) => {
        let userFind = await User.findOne({username: user.username, password: user.password});
        return userFind;
    }

    checkUsername = async (username) => {
        let userFind = await User.findOne({username: username});
        return userFind;
    }

    createUser = async (user) => {
        await User.create(user);
        return
    }

}

export default new UserService();