import * as taskRepository from '../repositories/task'
import { ITaskDocument, ICreateTaskDTO, IUpdateTaskDTO } from '../types/task'
import { NotFoundError, ValidationError } from '../utils/errors'

// TODO: Add caching for frequently accessed tasks
// TODO: Add bulk operations (create/update/delete multiple)
// TODO: Add task assignment to users (when auth is implemented)
// TODO: Add task priority and due date handling

export const getAllTasks = async (): Promise<ITaskDocument[]> => {
    return await taskRepository.findAll()
}

export const getTaskById = async (id: string): Promise<ITaskDocument> => {
    const task = await taskRepository.findById(id)

    if (!task) {
        throw new NotFoundError(`Task with id ${id} not found`)
    }

    return task
}

export const createTask = async (
    taskData: ICreateTaskDTO
): Promise<ITaskDocument> => {
    if (!taskData.title || !taskData.description) {
        throw new ValidationError('Title and description are required')
    }

    return await taskRepository.create(taskData)
}

export const updateTask = async (
    id: string,
    taskData: IUpdateTaskDTO
): Promise<ITaskDocument> => {
    if (Object.keys(taskData).length === 0) {
        throw new ValidationError('No fields to update')
    }

    const updatedTask = await taskRepository.update(id, taskData)

    if (!updatedTask) {
        throw new NotFoundError(`Task with id ${id} not found`)
    }

    return updatedTask
}

export const deleteTask = async (id: string): Promise<void> => {
    const deleted = await taskRepository.deleteTask(id)

    if (!deleted) {
        throw new NotFoundError(`Task with id ${id} not found`)
    }
}

export const getTaskStats = async (): Promise<{
    total: number
    todo: number
    inProgress: number
    completed: number
}> => {
    const [todo, inProgress, completed] = await Promise.all([
        taskRepository.countByStatus('TODO'),
        taskRepository.countByStatus('IN_PROGRESS'),
        taskRepository.countByStatus('COMPLETED'),
    ])

    return {
        total: todo + inProgress + completed,
        todo,
        inProgress,
        completed,
    }
}
