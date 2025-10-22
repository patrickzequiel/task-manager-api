import z from "zod";

export const loginUserSchema = z.object({
    body: z.object({
        username: z
            .string()
            .min(1, 'Username is required')
            .max(50, 'Username cannot exceed 100 characters')
            .trim(),
        password: z
            .string()
            .min(1, 'Password is required')
            .max(50, 'Password cannot exceed 100 characters')
            .trim(),
        // name: z
        //     .string()
        //     .min(1, 'Name is required')
        //     .max(100, 'Name cannot exceed 100 characters')
        //     .trim(),
        // email: z
        //     .string()
        //     .min(1, 'Email is required')
        //     .max(100, 'Email cannot exceed 100 characters')
        //     .trim()
        //     .email('Invalid email format'),
    }),
})

export const registerUserSchema = z.object({
    body: z.object({
        username: z
            .string()
            .min(1, 'Username is required')
            .max(50, 'Username cannot exceed 100 characters')
            .trim(),
        password: z
            .string()
            .min(1, 'Password is required')
            .max(50, 'Password cannot exceed 100 characters')
            .trim(),
        firstName: z
            .string()
            .min(1, 'First name is required')
            .max(50, 'First name cannot exceed 50 characters')
            .trim(),
        lastName: z
            .string()
            .min(1, 'Last name is required')
            .max(50, 'Last name cannot exceed 50 characters')
            .trim(),
        email: z
            .string()
            .min(1, 'Email is required')
            .max(100, 'Email cannot exceed 100 characters')
            .trim()
            .email('Invalid email format'),
    }),
})