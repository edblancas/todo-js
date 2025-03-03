import { useState } from "react"
import { useTodos } from "../App"
import { addTodo } from "../api/todoServce"

export function TodoForm() {
  const { todos, setTodos, refInput } = useTodos()
  const [newTodoTitle, setNewTodo] = useState()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    if (newTodoTitle.trim() == '') return
    const newTodo = { title: newTodoTitle, completed: false, id: crypto.randomUUID() }
    try {
      addTodo(newTodo)
      setTodos([...todos, newTodo])
      setNewTodo('')
    } catch (error) {
      console.error('error adding todo', error)
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-group">
        <label htmlFor="inputTodo">Add new todo:</label>
        <input className="form-control" ref={refInput} id="inputTodo" type='text' onChange={(e) => setNewTodo(e.target.value)} />
      </div>
      <button className='btn btn-primary' type='submit'>Add</button>
    </form>
  )
}
