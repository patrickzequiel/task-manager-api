// const model = require('../models');
import { Collection, Db } from 'mongodb';

interface Task {
  id: string;
  title: string;
  description: string;
  // Add more properties as needed
}

class Tasks {
  private collection: Collection<Task>;

  constructor(private db: any) {
    this.collection = this.db
}

  getTasks() {
    return `it worked the controller`;
  }

  async create(task: Task) {
    const result = await this.collection.insertOne(task);
    console.log(result)
    return `worked`;
  }
}

export default Tasks;
