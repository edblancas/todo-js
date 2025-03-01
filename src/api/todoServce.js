import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api/todos';

export const getAllTodos = async () => {
  const { data } = await axios.get('')
  return data
}

export const addTodo = async (todo) => {
  const { data } = await axios.post('', todo)
  return data
}

export const deleteTodo = async (id) => {
  await axios.delete(`/${id}`)
}

export const updateTodo = async (id, todo) => {
  await axios.put(`/${id}`, todo)
}
