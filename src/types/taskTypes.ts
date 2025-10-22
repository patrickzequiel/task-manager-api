import { Types } from 'mongoose'

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

// Task as embedded subdocument (no longer a separate collection)
export interface ITask {
    _id?: Types.ObjectId
    title: string
    description: string
    status: TaskStatus
    createdAt?: Date
    updatedAt?: Date
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
