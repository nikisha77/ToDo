
import React, { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import EditTodoForm from "./EditTodoForm"; 
import TaskCount from "./TaskCount";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() === "") return;

    const newTodo = { id: Date.now(), title: task, completed: false, isEditing: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setTask("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteItem = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };
  const editItem = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(updatedTodos);
  };

  const editTask = (task, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: task, isEditing: false } : todo
    );
    setTodos(updatedTodos);
  };
  const todos_completed = todos.filter((todo) => todo.completed).length;
  const total_todos = todos.length;

  return (
    <div>
      <TaskCount todos_completed={todos_completed} total_todos={total_todos} />
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write your next task"
        />
        <button type="submit"><i class="fa-solid fa-plus"></i></button>
      </form>
      <ol className="todo_list">
        {todos.length > 0 ? (
          todos.map((item) => (
            <li key={item.id} className="todo_item">
              {item.isEditing ? (
                <EditTodoForm editTodo={editTask} task={item} />
              ) : (
                <>
                  <div className="todo_content">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleComplete(item.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <p
                      style={{
                        textDecoration: item.completed ? "line-through" : "none",
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                  <div className="buttons">
                  <button className="edit" onClick={() => editItem(item.id)}>
                  <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className='delete' onClick={() => deleteItem(item.id)}>
                  <i class="fa-solid fa-trash"></i>
                  </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No tasks yet! Add one to get started.</p>
        )}
      </ol>
    </div>
  );
}

export default TodoApp;
