import React, { useState } from 'react';
import { Task } from '../features/tasksSlice';
import './TaskListItem.css';

interface Props {
  sno: number;
  task: Task;
  onEditDetails: (id: string, details: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskListItem: React.FC<Props> = ({ sno, task, onEditDetails, onDeleteTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState(task.details);

  const handleEditDetails = () => {
    setEditMode(true);
  };

  const handleSaveDetails = () => {
    onEditDetails(task.id, details ?? "");
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setDetails(task.details);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  const handleChangeDetails = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };

  return (
    <tr className="task-list-item">
      <td>{sno}</td>
      <td>{task.name}</td>
      <td>{editMode ? <textarea value={details} onChange={handleChangeDetails}></textarea> : task.details}</td>
      <td>
        {editMode ? (
          <>
            <button onClick={handleSaveDetails} className="task-action-button">Save</button>
            <button onClick={handleCancelEdit} className="task-action-button">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEditDetails} className="task-action-button">Edit Details</button>
            <button onClick={handleDeleteTask} className="task-action-button">Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TaskListItem;
