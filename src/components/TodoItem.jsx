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

  const handleToggleCompleted = (e, id) => {
    const checked = e.target.checked
    updateTodo(id, { completed: checked }).then(() =>
      setTodos(todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: checked }
        }
        return todo
      })))
  }

  // wont work cuz by the time the promise resolves the e.target has other value
  // use the approach above to capture the value
  // BETTER: USE ALWAYS ASYNC AND AWAIT
  const handleToggleCompletedNotWorks = (e, id) => {
    updateTodo(id, { completed: e.target.checked }).then(() => {
      setTodos(todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: e.target.checked }
        }
        return todo
      }))
    })
  }

  const handleToggleCompletedBetter = async (e, id) => {
    const checked = e.target.checked
    try {
      await updateTodo(id, { completed: checked })
      setTodos(todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: checked }
        }
        return todo
      }))
    } catch (error) {
      console.log('error toggle todo')
    }
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
              onChange={(e) => handleToggleCompletedBetter(e, id)} />
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
