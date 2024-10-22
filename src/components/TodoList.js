import React, { useState } from 'react';
import { Button } from '@react95/core';

// Компонент для списка дел (todo) с редактированием и сортировкой
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setNewTodo(todo.text);
  };

  const saveEditTodo = () => {
    setTodos(todos.map(todo => (
      todo.id === currentTodo.id ? { ...todo, text: newTodo } : todo
    )));
    setIsEditing(false);
    setNewTodo('');
    setCurrentTodo(null);
  };

  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '400px' }}>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {sortedTodos.map(todo => (
            <li key={todo.id} style={{ marginBottom: '5px' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <div style={{ marginTop: '5px' }}>
                <Button onClick={() => startEditTodo(todo)} style={{ marginRight: '10px' }}>
                  Edit
                </Button>
                <Button onClick={() => removeTodo(todo.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Контейнер для формы и кнопки внизу */}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Введите задачу на сегодня"
          style={{ marginRight: '10px', flexGrow: 1 }}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      {isEditing && (
        <Button onClick={saveEditTodo} style={{ marginTop: '10px' }}>
          Save
        </Button>
      )}
    </div>
  );
};

export default TodoList;
