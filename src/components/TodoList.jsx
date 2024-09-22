// src/components/TodoList.jsx
import React, { useEffect, useState } from 'react';
import useTodoStore from '../store/todoStore';

const TodoList = () => {
  const {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    saveTodos,
    clearTodos,
    updateTodo,
  } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateText, setUpdatedText] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    saveTodos(todos);
  });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo(''); // Clear the input after adding
    }
  };

  const handleUpdateTodo = () => {
    if (updateText.trim()) {
      updateTodo(updateId, updateText);
    }
    setOpen(false);
  };

  const handleModal = (id) => {
    setOpen(true);
    const filteredTodo = todos.filter((todo) => {
      if (todo.id === id) {
        return true;
      }
    });
    setUpdateId(filteredTodo[0].id);
    setUpdatedText(filteredTodo[0].text);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const displayModal = () => {
    return (
      <div className='modalflex'>
        <h3>Update Todo</h3>
        <input
          type='text'
          value={updateText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />

        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleUpdateTodo}>Submit</button>
      </div>
    );
  };

  return (
    <div className='todoheight'>
      {open && displayModal()}
      <h1>My Todos</h1>
      <input
        type='text'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='Add a new todo'
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul className='todos'>
        {todos.map((todo) => (
          <li key={todo.id} className='todo'>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <div>
              <button onClick={() => handleModal(todo.id)}>Edit</button>
              <button onClick={() => removeTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={saveTodos(todos)}>Save</button>
        <button onClick={clearTodos}>Clear Todos</button>
      </div>
    </div>
  );
};

export default TodoList;
