import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import '../../styles/TaskForm.css';

const TaskForm = ({ onClose, editTask = null }) => {
  const { addTask, updateTask } = useContext(TaskContext);
  const [title, setTitle] = useState(editTask ? editTask.title : '');
  const [description, setDescription] = useState(editTask ? editTask.description : '');
  const [dueDate, setDueDate] = useState(editTask ? (editTask.dueDate ? editTask.dueDate.substring(0, 10) : '') : '');
  const [priority, setPriority] = useState(editTask ? editTask.priority : 'medium');
  const [status, setStatus] = useState(editTask ? editTask.status : 'pending');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim()) {
      return setError('Title is required');
    }
    
    if (!dueDate) {
      return setError('Due date is required');
    }
    
    try {
      setIsSubmitting(true);
      
      const taskData = {
        title,
        description,
        dueDate: new Date(dueDate).toISOString(),
        priority,
        status
      };
      
      if (editTask) {
        await updateTask(editTask.id, taskData);
      } else {
        await addTask(taskData);
      }
      
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setError('Failed to save task. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  // Calculate minimum date (today) for the due date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="task-form-container">
      <div className="task-form-card">
        <h2>{editTask ? 'Edit Task' : 'Create New Task'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task details"
              rows="3"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">Due Date *</label>
            <input
              type="date"
              id="dueDate"
              className="form-control"
              value={dueDate}
              min={today}
              onChange={(e) => setDueDate(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (editTask ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
