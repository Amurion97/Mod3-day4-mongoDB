import {model, Schema} from "mongoose";

export interface IUser {
    username ?: string;
    password ?: string;
}

const UserSchema = new Schema<IUser>({
    username : String,
    password : String
})

const User = model('User', UserSchema);

export {User};