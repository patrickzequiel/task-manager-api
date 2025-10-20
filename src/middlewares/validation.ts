import { Request, Response, NextFunction } from 'express'
import { z, ZodError, ZodSchema } from 'zod'
import { ValidationError } from '../utils/errors'
import { TaskStatus } from '../types/task'

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction): void => {
            try {
                schema.parse({
                    body: req.body,
                    params: req.params,
                    query: req.query,
                })
                next()
            } catch (error) {
                if (error instanceof ZodError) {
                    const errorMessages = error.errors.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    }))
                    next(
                        new ValidationError(
                            JSON.stringify(errorMessages, null, 2)
                        )
                    )
                } else {
                    next(error)
                }
            }
        }

export const createTaskSchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(1, 'Title is required')
            .max(100, 'Title cannot exceed 100 characters')
            .trim(),
        description: z
            .string()
            .min(1, 'Description is required')
            .max(500, 'Description cannot exceed 500 characters')
            .trim(),
        status: z
            .nativeEnum(TaskStatus)
            .optional()
            .default(TaskStatus.TODO),
    }),
})

export const updateTaskSchema = z.object({
    body: z
        .object({
            title: z
                .string()
                .min(1, 'Title cannot be empty')
                .max(100, 'Title cannot exceed 100 characters')
                .trim()
                .optional(),
            description: z
                .string()
                .min(1, 'Description cannot be empty')
                .max(500, 'Description cannot exceed 500 characters')
                .trim()
                .optional(),
            status: z.nativeEnum(TaskStatus).optional(),
        })
        .refine(
            (data) =>
                data.title !== undefined ||
                data.description !== undefined ||
                data.status !== undefined,
            {
                message: 'At least one field must be provided for update',
            }
        ),
    params: z.object({
        id: z.string().min(1, 'Task ID is required'),
    }),
})

export const taskIdSchema = z.object({
    params: z.object({
        id: z.string().min(1, 'Task ID is required'),
    }),
})
