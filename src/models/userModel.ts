import mongoose, { Schema, Model } from 'mongoose'
import { IUserDocument } from '../types/userTypes'
import { TaskStatus } from '../types/taskTypes'
import { taskSchema } from './taskModel'

// TODO: Add password hashing with bcrypt
// TODO: Add email validation
// TODO: Add password strength validation

const userSchema = new Schema<IUserDocument>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            unique: true,
            maxlength: [50, 'Username cannot exceed 50 characters'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            maxlength: [50, 'First name cannot exceed 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            maxlength: [50, 'Last name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            unique: true,
            maxlength: [100, 'Email cannot exceed 100 characters'],
        },
        tasks: {
            type: [taskSchema],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'users',
    }
)

// Indexes for better query performance
userSchema.index({ 'tasks.status': 1 })
userSchema.index({ 'tasks.createdAt': -1 })

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
    'User',
    userSchema
)

export default UserModel
