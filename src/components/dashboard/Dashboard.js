import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { AuthContext } from '../../context/AuthContext';
import TaskCard from '../tasks/TaskCard';
import TaskForm from '../tasks/TaskForm';
import FilterPanel from '../common/FilterPanel';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const { tasks, loading } = useContext(TaskContext);
  const { currentUser } = useContext(AuthContext);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    searchTerm: ''
  });

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }
    
    // Filter by priority
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    
    // Filter by search term
    if (filters.searchTerm && 
        !task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !task.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser.name}</h1>
        <button 
          className="btn btn-primary add-task-btn" 
          onClick={toggleTaskForm}
        >
          {showTaskForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>
      
      <FilterPanel filters={filters} setFilters={setFilters} />
      
      {showTaskForm && (
        <TaskForm 
          onClose={toggleTaskForm} 
          editTask={editingTask} 
        />
      )}
      
      <div className="tasks-grid">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={() => handleEditTask(task)} 
            />
          ))
        ) : (
          <div className="no-tasks">
            <p>No tasks found. {tasks.length > 0 ? 'Try adjusting your filters.' : 'Add a task to get started!'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
