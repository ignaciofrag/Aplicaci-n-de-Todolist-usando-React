import React, { useState } from "react";
import "../../styles/index.css";

function Home() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Make the bed" },
    { id: 2, text: "Wash my hands" },
    { id: 3, text: "Eat" },
    { id: 4, text: "Walk the dog" },
  ]);
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <h3 className="titulo-todo">todos</h3>
      <div className="todo-container">
        <form onSubmit={handleAdd}>
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="boton-oculto">
            Agregar
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {todo.text}
              <span
                className="boton-eliminar"
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </span>
            </li>
          ))}
        </ul>
        <p className="items-restantes">{todos.length} item left</p>
      </div>
    </div>
  );
}

export default Home;
