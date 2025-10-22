import { Document, Types } from 'mongoose'
import { ITask } from './taskTypes'

export interface IUser {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    tasks: ITask[]
    createdAt?: Date
    updatedAt?: Date
}

export interface IUserDocument extends IUser, Document {
    _id: Types.ObjectId
}

export interface ICreateUserDTO {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
}

export interface ILoginUserDTO {
    username: string
    password: string
}
