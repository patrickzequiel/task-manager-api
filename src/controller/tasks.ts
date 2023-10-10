import { Model, Document, Types } from 'mongoose';
import mongoose from 'mongoose';

interface ITask extends Document {
  id: string;
  title: string;
  description: string;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    id: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { collection: 'tasks', versionKey: false } // Coloque todas as opções no mesmo objeto
);

const TaskModel: Model<ITask> = mongoose.model<ITask>('tasks', TaskSchema);

class Tasks {
  constructor() {
    this.connectToDatabase();
  }

  async connectToDatabase() {
    const uri = process.env.MONGO_URL || '';
    try {
      console.log('Connected to MongoDB');
      const options = {}; // Add any required options
      await mongoose.connect(uri, options);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTasks() {
    const tasks = await TaskModel.find({}).lean().exec();
    return tasks;
  }

  async create(task: ITask) {
    const result = await TaskModel.create(task);
    console.log(result);
    return 'worked';
  }

  async updateOne(req: any) {
    const taskId = req.params.id; // Access the id from the URL parameters
    const update: any = {}; // Object to store the fields to update

    if (req.body.title) {
      update.title = req.body.title;
    }

    if (req.body.description) {
      update.description = req.body.description;
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId }, // Filter by id
      { $set: update }, // Fields to update
      { new: true } // Return the updated document
    );

    return updatedTask;
  }

  async deleteOne(id: string) {
    const result = await TaskModel.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return 'Document deleted successfully';
    } else {
      return 'Document not found or not deleted';
    }
  }

}

export default Tasks;
