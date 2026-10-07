function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li className="todo-item" key={todo.id}>
          <input
            aria-label={`${todo.completed ? "Tandai belum selesai" : "Tandai selesai"}: ${todo.text}`}
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            type="checkbox"
          />
          <span className={todo.completed ? "todo-text completed" : "todo-text"}>
            {todo.text}
          </span>
          <button
            aria-label={`Hapus ${todo.text}`}
            className="delete-button"
            onClick={() => onDelete(todo.id)}
            type="button"
          >
            Hapus
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;