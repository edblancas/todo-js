import { useTodoContext } from "../App"
import { deleteTodo, updateTodo } from "../api/todoServce"

export function TodoItem({ id, completed, title }) {
  const { todos, setTodos } = useTodoContext()
  const handleDelete = async (id) => {
    try {
      deleteTodo(id)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch {
      console.error('error deleting todo')
    }
  }

  const handleToggleCompleted2 = (e, id) => {
    const checked = e.target.checked
    updateTodo(id, { completed: checked }).then(() =>
      setTodos(todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: checked }
        }
        return todo
      })))
  }

  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <div className="col-8">
          <div className="form-check">
            <input
              id={id}
              className="form-check-input"
              type='checkbox'
              checked={completed}
              onChange={(e) => handleToggleCompleted2(e, id)} />
            <label htmlFor={id} className="form-check-label">{title}</label>
          </div>
        </div>
        <div className="col-4 text-right">
          <button className="btn btn-danger" onClick={() => handleDelete(id)}>Delete</button>
        </div>
      </div>
    </li>
  )
}
