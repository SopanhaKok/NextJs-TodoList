import { Todo } from '../Type'
import ToDoItem from './TodoItem'

type Props = {
  todos: Todo[]
  toggleEditMode: (id: string) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
}

export default function TodoList({
  todos,
  toggleEditMode,
  deleteTodo,
  completeTodo,
}: Props) {
  return (
    <ul className='list-disc list-inside my-4'>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          toggleEditMode={toggleEditMode}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      ))}
    </ul>
  )
}
