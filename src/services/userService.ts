import * as userRepository from '../repositories/userRepository'
import { IUserDocument } from "../types"

export const getUserByUsernameAndPassword = async (username:
    string, password: string
): Promise<IUserDocument | null> => {
    return await userRepository.findByUsernameAndPassworrd(username, password)
}

export const createUser = async (username: string, password: string, firstName: string, lastName: string, email: string
): Promise<IUserDocument> => {
    return await userRepository.createUser({ username, password, firstName, lastName, email, tasks: [] })
}
