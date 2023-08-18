import { Router } from "express";
import Tasks from "../controller/tasks";
const router = Router();

const tasks = new Tasks();
router.get("/", (req: any, res: any) => {
  return res.json(tasks.getTasks());
});

export default router;
