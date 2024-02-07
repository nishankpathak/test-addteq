import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { Task } from './schema/task';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let tasks: Task[] = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tasks', (req: Request, res: Response) => {
  const activeTasks = tasks.filter(task => !task.deleted);
  res.json(activeTasks);
});

app.post('/tasks', (req: Request, res: Response) => {
  const { name, details } = req.body;
  const newTask = new Task(name, details);
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { details } = req.body;
  const task = tasks.find(task => task.id === id && !task.deleted);
  if (task) {
    task.details = details;
    task.updatedAt = new Date();
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === id && !task.deleted);
  if (task) {
    task.deleted = true;
    task.updatedAt = new Date();
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
