import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { tasksData } from './tasksData';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.json(tasksData);
});
router.get('/:id', (req, res) => {
    const { id } = req.params
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done,created_at,updated_at } = req.body;
    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at:new Date().toISOString(),
        updated_at:new Date().toISOString()
    };
    tasksData.tasks.push(newTask);
    res.status(201).json(newTask);
    tasksData.total_results++;
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id); 
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }

    const updatedTask = {
        ...tasksData.tasks[taskIndex],
        ...req.body,
        updated_at: new Date().toISOString(), 
        id: id
    };

    tasksData.tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return res.status(404).json({status:404,message:'Task not found'});
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send();
    tasksData.total_results--;
});
export default router;