import { Model, Document, Types } from 'mongoose';
import mongoose from 'mongoose';

interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  // Add more properties as needed
}

const TaskSchema = new mongoose.Schema<ITask>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Define more properties here
});

const TaskModel: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema);

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
    const tasks = await TaskModel.find({}).exec();
    return tasks;
  }

  async create(task: ITask) {
    const result = await TaskModel.create(task);
    console.log(result);
    return 'worked';
  }
}

export default Tasks;
