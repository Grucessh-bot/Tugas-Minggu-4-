import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import "./M03App.css";

const initialTodos = [
  { id: 1, text: "Tambah karyawan", completed: true },
  { id: 2, text: "Cek stok barang", completed: true },
  { id: 3, text: "Hitung pendapatan", completed: false },
];

function M03App() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  function addTodo(event) {
    event.preventDefault();
    const text = newTodo.trim();

    if (!text) return;

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: currentTodos.reduce((highestId, todo) => Math.max(highestId, todo.id), 0) + 1,
        text,
        completed: false,
      },
    ]);
    setNewTodo("");
  }

  function toggleTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(todoId) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
  }

  return (
    <main className="todo-card">
      <h1>To-Do List</h1>
      <h2 className="todo-subtitle">251130206_Pajry Ananda  Lingga</h2>
      <TodoInput value={newTodo} onChange={setNewTodo} onSubmit={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </main>
  );
}

export default M03App;