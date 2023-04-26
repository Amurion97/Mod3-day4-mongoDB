"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../enitity/user");
class UserService {
    constructor() {
        this.getAll = async () => {
            let users = await user_1.User.find();
            return users;
        };
        this.checkUser = async (user) => {
            let userFind = await user_1.User.findOne({ username: user.username, password: user.password });
            return userFind;
        };
        this.checkUsername = async (username) => {
            let userFind = await user_1.User.findOne({ username: username });
            return userFind;
        };
        this.createUser = async (user) => {
            await user_1.User.create(user);
            return;
        };
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map