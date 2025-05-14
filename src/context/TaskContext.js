import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [currentUser]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // Simulate API call
      // In a real app, you would fetch from your API
      const storedTasks = localStorage.getItem('tasks');
      const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
      setTasks(parsedTasks);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const newTask = {
        id: Date.now(),
        ...task,
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
        status: task.status || 'pending'
      };
      
      const updatedTasks = [...tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      return newTask;
    } catch (err) {
      setError('Failed to add task');
      throw err;
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      return updatedTasks.find(task => task.id === id);
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
