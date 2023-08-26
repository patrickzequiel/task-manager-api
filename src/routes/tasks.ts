import { Router } from "express";
import Tasks from "../controller/tasks";
import mongo from "../db";

const router = Router();

const connectDB = async () => {
    const db = new mongo();
    const connection = await db.connect();
    const tasks = new Tasks(connection);
    return tasks;
}

router.get("/", async (req: any, res: any) => {
  const tasks = await connectDB();
  return res.json(tasks.getTasks());
});

router.post("/", async (req: any, res: any) => {
  const tasks = await connectDB();
  return res.json(tasks.create(req.body));
});

export default router;