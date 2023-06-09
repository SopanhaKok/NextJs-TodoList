'use client'
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'

type Todo = {
  id: string
  todo: string
  isCompleted: boolean
  createdAt: Date
}

export default function ToDoItem({
  todo,
  toggleEditMode,
  deleteTodo,
  completeTodo,
}: {
  todo: Todo
  toggleEditMode: (id: string) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
}) {
  return (
    <>
      <li className='flex justify-between items-center bg-slate-100 mb-2 group'>
        <div
          className={`text-lg ml-4 ${todo.isCompleted ? 'line-through' : ''}`}
        >
          <input
            type='checkbox'
            className='mr-2 cursor-pointer'
            onChange={() => completeTodo(todo.id)}
            checked={todo.isCompleted}
          />
          {todo.todo}
        </div>
        <div className='opacity-0 group-hover:opacity-100'>
          <button
            onClick={() => toggleEditMode(todo.id)}
            className='bg-lime-500 hover:bg-lime-600 text-white font-bold text-lg px-4 py-2'
          >
            <FiEdit className='h-full' />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className='bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-4 py-2'
          >
            <FiTrash2 />
          </button>
        </div>
      </li>
    </>
  )
}
