import React, { useState } from "react";
import "./App.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    status: "notCompleted",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [editTodo, setEditTodo] = useState(null);

  const addTodo = () => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
    setNewTodo({ name: "", description: "", status: "notCompleted" });
  };

  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status:
                todo.status === "completed" ? "notCompleted" : "completed",
            }
          : todo
      )
    );
  };

  const editTodoItem = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoToEdit);
    setNewTodo({ ...todoToEdit }); // Pre-fill the form with existing data for editing
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodo.id ? { ...newTodo, id: editTodo.id } : todo
      )
    );
    setEditTodo(null);
    setNewTodo({ name: "", description: "", status: "notCompleted" });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filterTodos = () => {
    switch (filterStatus) {
      case "completed":
        return todos.filter((todo) => todo.status === "completed");
      case "notCompleted":
        return todos.filter((todo) => todo.status === "notCompleted");
      default:
        return todos;
    }
  };

  return (
    <div className="container">
      <h2 className="heading">My Todo</h2>
      <div className="main-input">
        <div>
          <input
            placeholder="Todo Name"
            type="text"
            value={newTodo.name}
            onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
          />
        </div>
        <div>
          <textarea
            value={newTodo.description}
            placeholder="Todo Description"
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="addbutton">
          {editTodo ? (
            <button onClick={updateTodo}>Update Todo</button>
          ) : (
            <button onClick={addTodo}>Add Todo</button>
          )}
        </div>
      </div>

      <div className="filter-heading">
        <h2>My Todo</h2>
        <div className="filter-select">
          <label>Filter Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
        </div>
      </div>

      <div className="card-component">
        {filterTodos().map((todo) => (
          <div key={todo.id} className="todo-card">
            <h3>Name: {todo.name}</h3>
            <p> Description: {todo.description}</p>
            <p>
              Status:
              {editTodo && editTodo.id === todo.id ? (
                <select
                  value={newTodo.status}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, status: e.target.value })
                  }
                >
                  <option value="notCompleted">Not Completed</option>
                  <option value="completed">Completed</option>
                </select>
              ) : (
                <span
                  className={
                    todo.status === "completed"
                      ? "status-completed"
                      : "status-not-completed"
                  }
                  onClick={() => toggleStatus(todo.id)}
                  style={{ cursor: "pointer" }}
                >
                  {todo.status}
                </span>
              )}
            </p>
            <div className="edit-delete">
              <button className="edit" onClick={() => editTodoItem(todo.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
