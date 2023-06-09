import { FiEdit, FiPlus } from 'react-icons/fi'

type Props = {
  handleSubmit: (e: React.FormEvent) => void
  todo: string
  onTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isEdit: boolean
}

export default function AddTodo({
  handleSubmit,
  todo,
  onTodoChange,
  isEdit,
}: Props) {
  return (
    <form className='flex' onSubmit={handleSubmit}>
      <input
        type='text'
        value={todo}
        onChange={onTodoChange}
        className=' border border-gray-300 px-4  focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Add your new todo'
      />

      <button
        onClick={handleSubmit}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-4 py-2 ml-2'
      >
        {isEdit ? <FiEdit /> : <FiPlus />}
      </button>
    </form>
  )
}
