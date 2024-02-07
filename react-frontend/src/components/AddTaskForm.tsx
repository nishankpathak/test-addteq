import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasksSlice';
import './AddTaskForm.css';

const AddTaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState<string>('');

  const dispatch = useDispatch<any>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    dispatch(addTask({ name: taskName }));
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        className="add-task-input"
      />
      <button type="submit" className="add-task-button">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
