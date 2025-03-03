import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getAllTodos } from './api/todoServce'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

const TodoContext = createContext(undefined)
export const useTodoContext = () => useContext(TodoContext)

function App() {
  const [todos, setTodos] = useState([])
  const refInput = useRef(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getAllTodos();
        setTodos(todosData);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleOnClickFocus = () => {
    refInput.current && refInput.current.focus()
  }

  return (
    <TodoContext.Provider value={{ todos, setTodos, refInput }}>
      <div className='container'>
        <div className="col-md-12 mb-3">
          <TodoForm />
        </div>
        <div className="col-md-12">
          <TodoList />
        </div>
        <div className='col-md-12 mt-3'>
          <button className='btn' onClick={handleOnClickFocus}> Focus input </button>
        </div>
      </div>
    </ TodoContext.Provider>
  )
}

export default App
