import { Document, Types } from 'mongoose'

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

export interface ITask {
    title: string
    description: string
    status: TaskStatus
    createdAt?: Date
    updatedAt?: Date
}

export interface ITaskDocument extends ITask, Document {
    _id: Types.ObjectId
}

export interface ICreateTaskDTO {
    title: string
    description: string
    status?: TaskStatus
}

export interface IUpdateTaskDTO {
    title?: string
    description?: string
    status?: TaskStatus
}
