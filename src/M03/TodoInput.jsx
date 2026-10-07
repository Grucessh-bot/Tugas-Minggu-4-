function TodoInput({ value, onChange, onSubmit }) {
  return (
    <form className="todo-input" onSubmit={onSubmit}>
      <input
        aria-label="Tambahkan todo"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tambahkan Todo..."
        type="text"
        value={value}
      />
      <button type="submit">Tambahkan</button>
    </form>
  );
}

export default TodoInput;