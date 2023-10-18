import { Model, Document, Types } from 'mongoose'
import mongoose from 'mongoose'

interface ITask extends Document {
    id: string
    title: string
    description: string
}

const TaskSchema = new mongoose.Schema<ITask>(
    {
        id: { type: String, required: false },
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    { collection: 'tasks', versionKey: false }
)

const TaskModel: Model<ITask> = mongoose.model<ITask>('tasks', TaskSchema)

class Tasks {
    constructor() {
        this.connectToDatabase()
    }

    async connectToDatabase() {
        const uri = process.env.MONGO_URL || '';
        try {
          const options: any = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          };
          await mongoose.connect(uri, options);
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({}).lean().exec()
            console.log(`value of tasks `, tasks);
            return tasks
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async create(task: ITask) {
        try {
            const result = await TaskModel.create(task)
            console.log(result)
            return 'worked'
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateOne(req: any) {
        try {
            const taskId = req.params.id
            const update: any = {}

            if (req.body.title) {
                update.title = req.body.title
            }

            if (req.body.description) {
                update.description = req.body.description
            }

            const updatedTask = await TaskModel.findOneAndUpdate(
                { _id: taskId },
                { $set: update },
                { new: true }
            )

            return updatedTask
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async deleteOne(id: string) {
        try {
            const result = await TaskModel.deleteOne({ _id: id })
            if (result.deletedCount === 1) {
                return 'Document deleted successfully'
            } else {
                return 'Document not found or not deleted'
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default Tasks
