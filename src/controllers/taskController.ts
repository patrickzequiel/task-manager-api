import { Request, Response, NextFunction } from 'express'
import * as taskService from '../services/taskService'
import { ICreateTaskDTO, IUpdateTaskDTO } from '../types/taskTypes'

// TODO: Add authentication middleware to get real userId
// TODO: Add request rate limiting per user
// TODO: Add response caching headers
// TODO: Add request/response compression
// TODO: Add API versioning support

// TEMPORARY: Hardcoded userId for testing until authentication is implemented
// This should be replaced with the actual authenticated user's ID from req.user
const TEMP_USER_ID = '507f1f77bcf86cd799439011' // Replace this with a real user ID from your DB

export const getAllTasks = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // TODO: Get userId from authenticated user (req.user.id)
        const userId = TEMP_USER_ID
        const tasks = await taskService.getAllTasks(userId)
        res.status(200).json({
            success: true,
            data: tasks,
            count: tasks.length,
        })
    } catch (error) {
        next(error)
    }
}

export const getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // TODO: Get userId from authenticated user (req.user.id)
        const userId = TEMP_USER_ID
        const { id } = req.params
        const task = await taskService.getTaskById(userId, id)
        res.status(200).json({
            success: true,
            data: task,
        })
    } catch (error) {
        next(error)
    }
}

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // TODO: Get userId from authenticated user (req.user.id)
        const userId = TEMP_USER_ID
        const taskData: ICreateTaskDTO = req.body
        const task = await taskService.createTask(userId, taskData)
        res.status(201).json({
            success: true,
            data: task,
            message: 'Task created successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // TODO: Get userId from authenticated user (req.user.id)
        const userId = TEMP_USER_ID
        const { id } = req.params
        const taskData: IUpdateTaskDTO = req.body
        const task = await taskService.updateTask(userId, id, taskData)
        res.status(200).json({
            success: true,
            data: task,
            message: 'Task updated successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // TODO: Get userId from authenticated user (req.user.id)
        const userId = TEMP_USER_ID
        const { id } = req.params
        await taskService.deleteTask(userId, id)
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const getTaskStats = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // TODO: Get userId from authenticated user (req.user.id)
        const userId = TEMP_USER_ID
        const stats = await taskService.getTaskStats(userId)
        res.status(200).json({
            success: true,
            data: stats,
        })
    } catch (error) {
        next(error)
    }
}
