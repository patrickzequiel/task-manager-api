import { Types } from "mongoose"
import UserModel from "../models/userModel"
import { IUser, IUserDocument } from "../types"

export const findByUsernameAndPassworrd = async (username: string, password: string): Promise<IUserDocument | null> => {
    return await UserModel.findOne({ username, password })
}

export const createUser = async (userData: IUser
): Promise<IUserDocument> => {
    const user = new UserModel(userData)
    return await user.save()
}   
