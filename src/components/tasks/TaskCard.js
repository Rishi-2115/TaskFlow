import React from 'react';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import '../../styles/TaskCard.css';

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  
  const handleStatusChange = (e) => {
    updateTask(task.id, { status: e.target.value });
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };
  
  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };
  
  const getStatusClass = () => {
    switch (task.status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className={`task-card ${getStatusClass()}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${getPriorityClass()}`}>
          {task.priority}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-meta">
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
      <div className="task-actions">
        <select 
          value={task.status} 
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button 
          onClick={() => updateTask(task.id, { ...task })} 
          className="btn btn-sm btn-primary"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
