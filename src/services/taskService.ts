import * as taskRepository from '../repositories/taskRepository'
import { ITask, ICreateTaskDTO, IUpdateTaskDTO } from '../types/taskTypes'
import { NotFoundError, ValidationError } from '../utils/errors'

// TODO: Add caching for frequently accessed tasks
// TODO: Add bulk operations (create/update/delete multiple)
// TODO: Add task priority and due date handling

// Get all tasks for a specific user
export const getAllTasks = async (userId: string): Promise<ITask[]> => {
    return await taskRepository.findAllByUserId(userId)
}

// Get a specific task by ID for a user
export const getTaskById = async (userId: string, taskId: string): Promise<ITask> => {
    const task = await taskRepository.findByIdAndUserId(userId, taskId)

    if (!task) {
        throw new NotFoundError(`Task with id ${taskId} not found`)
    }

    return task
}

// Create a new task for a user
export const createTask = async (
    userId: string,
    taskData: ICreateTaskDTO
): Promise<ITask> => {
    if (!taskData.title || !taskData.description) {
        throw new ValidationError('Title and description are required')
    }

    const task = await taskRepository.create(userId, taskData)

    if (!task) {
        throw new NotFoundError(`User with id ${userId} not found`)
    }

    return task
}

// Update a task for a user
export const updateTask = async (
    userId: string,
    taskId: string,
    taskData: IUpdateTaskDTO
): Promise<ITask> => {
    if (Object.keys(taskData).length === 0) {
        throw new ValidationError('No fields to update')
    }

    const updatedTask = await taskRepository.update(userId, taskId, taskData)

    if (!updatedTask) {
        throw new NotFoundError(`Task with id ${taskId} not found`)
    }

    return updatedTask
}

// Delete a task for a user
export const deleteTask = async (userId: string, taskId: string): Promise<void> => {
    const deleted = await taskRepository.deleteTask(userId, taskId)

    if (!deleted) {
        throw new NotFoundError(`Task with id ${taskId} not found`)
    }
}

// Get task statistics for a user
export const getTaskStats = async (userId: string): Promise<{
    total: number
    todo: number
    inProgress: number
    completed: number
}> => {
    const [todo, inProgress, completed] = await Promise.all([
        taskRepository.countByStatusAndUserId(userId, 'TODO'),
        taskRepository.countByStatusAndUserId(userId, 'IN_PROGRESS'),
        taskRepository.countByStatusAndUserId(userId, 'COMPLETED'),
    ])

    return {
        total: todo + inProgress + completed,
        todo,
        inProgress,
        completed,
    }
}
