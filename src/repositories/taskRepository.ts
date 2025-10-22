import { Types } from 'mongoose'
import UserModel from '../models/userModel'
import { ITask, ICreateTaskDTO, IUpdateTaskDTO } from '../types/taskTypes'

// TODO: Add pagination support (limit, skip)
// TODO: Add filtering by status, date range
// TODO: Add full-text search capability

// Find all tasks for a specific user
export const findAllByUserId = async (userId: string): Promise<ITask[]> => {
    if (!Types.ObjectId.isValid(userId)) {
        return []
    }

    const user = await UserModel.findById(userId).select('tasks').lean().exec()
    return user?.tasks || []
}

// Find a specific task by task ID within a user's tasks
export const findByIdAndUserId = async (
    userId: string,
    taskId: string
): Promise<ITask | null> => {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(taskId)) {
        return null
    }

    const user = await UserModel.findOne(
        { _id: userId, 'tasks._id': taskId },
        { 'tasks.$': 1 }
    ).lean().exec()

    return user?.tasks?.[0] || null
}

// Create a new task for a user
export const create = async (
    userId: string,
    taskData: ICreateTaskDTO
): Promise<ITask | null> => {
    if (!Types.ObjectId.isValid(userId)) {
        return null
    }

    const newTask = {
        _id: new Types.ObjectId(),
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const user = await UserModel.findByIdAndUpdate(
        userId,
        { $push: { tasks: newTask } },
        { new: true, runValidators: true }
    ).exec()

    if (!user || !user.tasks) {
        return null
    }

    return user.tasks[user.tasks.length - 1]
}

// Update a task for a user
export const update = async (
    userId: string,
    taskId: string,
    taskData: IUpdateTaskDTO
): Promise<ITask | null> => {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(taskId)) {
        return null
    }

    const updateFields: any = {}
    if (taskData.title !== undefined) updateFields['tasks.$.title'] = taskData.title
    if (taskData.description !== undefined) updateFields['tasks.$.description'] = taskData.description
    if (taskData.status !== undefined) updateFields['tasks.$.status'] = taskData.status
    updateFields['tasks.$.updatedAt'] = new Date()

    const user = await UserModel.findOneAndUpdate(
        { _id: userId, 'tasks._id': taskId },
        { $set: updateFields },
        { new: true, runValidators: true }
    ).exec()

    if (!user) {
        return null
    }

    const updatedTask = user?.tasks?.find(
        (task) => task._id?.toString() === taskId
    )
    return updatedTask || null
}

// Delete a task for a user
export const deleteTask = async (
    userId: string,
    taskId: string
): Promise<boolean> => {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(taskId)) {
        return false
    }

    const result = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { tasks: { _id: taskId } } },
        { new: true }
    ).exec()

    return result !== null
}

// Count tasks by status for a user
export const countByStatusAndUserId = async (
    userId: string,
    status: string
): Promise<number> => {
    if (!Types.ObjectId.isValid(userId)) {
        return 0
    }

    const result = await UserModel.aggregate([
        { $match: { _id: new Types.ObjectId(userId) } },
        { $unwind: '$tasks' },
        { $match: { 'tasks.status': status } },
        { $count: 'total' }
    ]).exec()

    return result[0]?.total || 0
}
