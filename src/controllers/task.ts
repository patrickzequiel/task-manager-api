import { Request, Response, NextFunction } from 'express'
import * as taskService from '../services/task'
import { ICreateTaskDTO, IUpdateTaskDTO } from '../types/task'

// TODO: Add request rate limiting per user
// TODO: Add response caching headers
// TODO: Add request/response compression
// TODO: Add API versioning support

export const getAllTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const tasks = await taskService.getAllTasks()
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
        const { id } = req.params
        const task = await taskService.getTaskById(id)
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
        const taskData: ICreateTaskDTO = req.body
        const task = await taskService.createTask(taskData)
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
        const { id } = req.params
        const taskData: IUpdateTaskDTO = req.body
        const task = await taskService.updateTask(id, taskData)
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
        const { id } = req.params
        await taskService.deleteTask(id)
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
        const stats = await taskService.getTaskStats()
        res.status(200).json({
            success: true,
            data: stats,
        })
    } catch (error) {
        next(error)
    }
}
