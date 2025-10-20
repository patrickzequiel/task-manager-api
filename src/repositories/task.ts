import { Types } from 'mongoose'
import TaskModel from '../models/task'
import { ITaskDocument, ICreateTaskDTO, IUpdateTaskDTO } from '../types/task'

// TODO: Add pagination support (limit, skip)
// TODO: Add filtering by status, date range
// TODO: Add full-text search capability

export const findAll = async (): Promise<ITaskDocument[]> => {
    return await TaskModel.find().sort({ createdAt: -1 }).lean().exec()
}

export const findById = async (id: string): Promise<ITaskDocument | null> => {
    if (!Types.ObjectId.isValid(id)) {
        return null
    }
    return await TaskModel.findById(id).lean().exec()
}

export const create = async (
    taskData: ICreateTaskDTO
): Promise<ITaskDocument> => {
    const task = await TaskModel.create(taskData)
    return task.toObject()
}

export const update = async (
    id: string,
    taskData: IUpdateTaskDTO
): Promise<ITaskDocument | null> => {
    if (!Types.ObjectId.isValid(id)) {
        return null
    }

    return await TaskModel.findByIdAndUpdate(
        id,
        { $set: taskData },
        { new: true, runValidators: true }
    )
        .lean()
        .exec()
}

export const deleteTask = async (id: string): Promise<boolean> => {
    if (!Types.ObjectId.isValid(id)) {
        return false
    }

    const result = await TaskModel.findByIdAndDelete(id).exec()
    return result !== null
}

export const countByStatus = async (status: string): Promise<number> => {
    return await TaskModel.countDocuments({ status }).exec()
}
