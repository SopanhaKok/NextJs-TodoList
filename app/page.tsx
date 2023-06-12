'use client'

import { useEffect, useState } from 'react'
import WarningModal from './components/WarningModal'
import { v4 as uuidv4 } from 'uuid'

import AddTodo from './components/AddTodo'

import { Todo } from './Type'
import TodoList from './components/TodoList'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState('')
  const [isWarning, setIsWarning] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentTodoId, setCurrentTodoId] = useState<string>('')
  const [search, setSearch] = useState('')
  const [searchedTodos, setSearchedTodos] = useState<Todo[]>([])

  const onTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (todo === ' ' || todo === '') return
    if (todos.some((t) => t.todo === todo.trim())) {
      setIsWarning(true)
      return
    }
    const newTodo = {
      id: uuidv4(),
      todo,
      isCompleted: false,
      createdAt: new Date(),
    }

    setTodos([newTodo, ...todos])
    setTodo('')
  }

  const completeTodo = async (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted }
      }
      return todo
    })

    setTodos(newTodos)
  }

  const toggleEditMode = (id: string) => {
    const todo = todos.find((todo) => todo.id === id)
    setTodo(todo!.todo)
    setCurrentTodoId(id)
    setIsEdit(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit && currentTodoId) {
      editTodo(currentTodoId, todo)
    } else {
      addTodo(e)
    }
  }

  const editTodo = async (id: string, newTodo: string) => {
    if (newTodo === ' ' || newTodo === '') return
    if (todos.some((t) => t.todo === newTodo.trim())) {
      setIsWarning(true)
      return
    }
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todo: newTodo }
      }
      return todo
    })

    setTodos(newTodos)
    setTodo('')
    setIsEdit(false)
  }

  const deleteTodo = async (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const clearTodos = () => {
    setTodos([])
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    const newTodos = todos.filter((todo) =>
      todo.todo.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setSearchedTodos(newTodos)
  }

  const closeWarningModal = () => {
    setIsWarning(false)
  }

  return (
    <main className='bg-slate-600 min-h-screen lg:flex lg:justify-center lg:items-center'>
      <div className='lg:container lg:mx-auto  lg:w-1/2'>
        <div className=' bg-white p-4 '>
          <h2 className='font-bold mb-2'>Todo Lists</h2>
          <div className='flex flex-col lg:flex-row justify-between '>
            <AddTodo
              todo={todo}
              onTodoChange={onTodoChange}
              handleSubmit={handleSubmit}
              isEdit={isEdit}
            />
            <input
              type='text'
              className='mt-2 lg:mt-0 border border-gray-300 px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Search your todo'
              value={search}
              onChange={handleSearch}
            />
          </div>
          {search.length > 0 && searchedTodos.length > 0 ? (
            <TodoList
              todos={searchedTodos}
              toggleEditMode={toggleEditMode}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
          ) : search.length > 0 && searchedTodos.length === 0 ? (
            <p className='mt-6'>No result. Create a new one instead!</p>
          ) : (
            <>
              <TodoList
                todos={todos}
                toggleEditMode={toggleEditMode}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            </>
          )}

          <div className='flex justify-between items-center'>
            {todos.length == 0 ? (
              <p>You don't have any todos</p>
            ) : (
              <p>You have {todos.length} remaining tasks</p>
            )}
            <button
              onClick={clearTodos}
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-4 py-2 ml-2'
            >
              Clear All
            </button>
          </div>
          {isWarning && <WarningModal closeWarningModal={closeWarningModal} />}
        </div>
      </div>
    </main>
  )
}
