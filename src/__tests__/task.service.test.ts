import TaskService from '../services/taskService'
import TaskRepository from '../repositories/taskRepository'
import { NotFoundError, ValidationError } from '../utils/errors'
import { TaskStatus } from '../types/taskTypes'

jest.mock('../repositories/taskRepository')

describe('TaskService', () => {
    let taskService: TaskService
    let mockTaskRepository: jest.Mocked<TaskRepository>

    beforeEach(() => {
        mockTaskRepository = new TaskRepository() as jest.Mocked<TaskRepository>
        taskService = new TaskService()
        ;(taskService as any).taskRepository = mockTaskRepository
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createTask', () => {
        it('should create a task successfully', async () => {
            const taskData = {
                title: 'Test Task',
                description: 'Test Description',
            }

            const createdTask = {
                _id: '123',
                ...taskData,
                status: TaskStatus.TODO,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            mockTaskRepository.create.mockResolvedValue(createdTask as any)

            const result = await taskService.createTask(taskData)

            expect(result).toEqual(createdTask)
            expect(mockTaskRepository.create).toHaveBeenCalledWith(taskData)
        })

        it('should throw ValidationError when title is missing', async () => {
            const taskData = {
                title: '',
                description: 'Test Description',
            }

            await expect(taskService.createTask(taskData)).rejects.toThrow(
                ValidationError
            )
        })
    })

    describe('getTaskById', () => {
        it('should return a task when found', async () => {
            const task = {
                _id: '123',
                title: 'Test Task',
                description: 'Test Description',
                status: TaskStatus.TODO,
            }

            mockTaskRepository.findById.mockResolvedValue(task as any)

            const result = await taskService.getTaskById('123')

            expect(result).toEqual(task)
            expect(mockTaskRepository.findById).toHaveBeenCalledWith('123')
        })

        it('should throw NotFoundError when task not found', async () => {
            mockTaskRepository.findById.mockResolvedValue(null)

            await expect(taskService.getTaskById('123')).rejects.toThrow(
                NotFoundError
            )
        })
    })

    describe('deleteTask', () => {
        it('should delete a task successfully', async () => {
            mockTaskRepository.delete.mockResolvedValue(true)

            await taskService.deleteTask('123')

            expect(mockTaskRepository.delete).toHaveBeenCalledWith('123')
        })

        it('should throw NotFoundError when task not found', async () => {
            mockTaskRepository.delete.mockResolvedValue(false)

            await expect(taskService.deleteTask('123')).rejects.toThrow(
                NotFoundError
            )
        })
    })
})
