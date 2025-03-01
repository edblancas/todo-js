import { useTodoContext } from "../App"
import { TodoItem } from "./TodoItem"

export function TodoList() {
  const { todos } = useTodoContext()
  return (
    <>
      {todos.length === 0 && "no todos"}
      <ol className="list-group">
        {todos.map((todo) => {
          return (
            <TodoItem key={todo.id} {...todo} />
          )
        })}
      </ol>
    </>
  )
}
