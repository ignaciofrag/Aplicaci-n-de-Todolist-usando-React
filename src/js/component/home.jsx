import React, { useState, useEffect } from "react";
import "../../styles/index.css";

function Home() {
  const initialTodos = [
    { id: 1, text: "Make the bed", done: false },
    { id: 2, text: "Wash my hands", done: false },
    { id: 3, text: "Eat", done: false },
    { id: 4, text: "Walk the dog", done: false },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");
  const username = "tuNombreDeUsuario"; // Asegúrate de cambiar esto por tu nombre de usuario real
  const apiUrl = `https://playground.4geeks.com/apis/fake/todos/user/${username}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to fetch todos');
        }
        return resp.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formattedTodos = data.map((todo) => ({
            id: todo.id || todo.label, // Corrección: asegúrate de que la API devuelve un ID único o genera uno tú mismo
            text: todo.label,
            done: todo.done,
          }));
          setTodos(formattedTodos);
        }
      })
      .catch((error) => {
        console.log(error);
        // Intentar crear un nuevo usuario si no existe
        fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify([]),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          console.log('Nuevo usuario creado');
        }).catch(error => console.error('Error creando el usuario:', error));
      });
  }, [apiUrl]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodos = [...todos, { id: Date.now(), text: input, done: false }];
    updateTodos(newTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(updatedTodos);
  };

  const handleClearAll = () => {
    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setTodos([]); // Limpiar todos en el estado local
    })
    .catch(error => console.log(error));
  };

  const updateTodos = (newTodos) => {
    fetch(apiUrl, {
      method: 'PUT',
      body: JSON.stringify(newTodos.map(todo => ({ label: todo.text, done: todo.done }))),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(() => {
      setTodos(newTodos); // Actualizar el estado local con la nueva lista de tareas
    })
    .catch(error => console.log(error));
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
          <button type="submit" className="boton-oculto">Agregar</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {todo.text}
              <span className="boton-eliminar" onClick={() => handleDelete(todo.id)}>×</span>
            </li>
          ))}
        </ul>
        <button onClick={handleClearAll} className="limpiar-todos">Limpiar Todos</button>
        <p className="items-restantes">{todos.length} item(s) left</p>
      </div>
    </div>
  );
}

export default Home;
