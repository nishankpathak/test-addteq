import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { deleteTask, fetchTasks, updateTaskDetails } from '../features/tasksSlice';
import TaskListItem from './TaskListItem';
import AddTaskForm from './AddTaskForm';
import './TaskList.css';

const TaskList: React.FC = () => {
  const dispatch = useDispatch<any>()
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-list-container">
      <h2>Task Management System</h2>
      <AddTaskForm />
      <h2>Task List</h2>
      {
        tasks.length > 0 
        ? 
        <table className="task-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Task Name</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <TaskListItem
                key={task.id}
                sno={index + 1}
                task={task}
                onEditDetails={(id, details) => {
                  // action dispatched for edit details
                  dispatch(updateTaskDetails({ id, details }));
                }}
                onDeleteTask={(id) => {
                  // action dispatched to delete task
                  dispatch(deleteTask(id));
                }}
              />
            ))}
          </tbody>
        </table>
        : 
        <p>please create a task!</p>
      }
    </div>
  );
};

export default TaskList;
