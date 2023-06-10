import type { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore'
import { todosCollectionRef } from '@/app/utils/firestore.collection'
import { db } from '@/app/utils/firebase'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      handleCompletedTodoRequest(req, res)
      break
    case 'PUT':
      // Update Todo
      handleUpdateTodoRequest(req, res)
      break
    case 'DELETE':
      console.log('dasdas')
      // Delete Todo
      handleDeleteTodoRequest(req, res)
      break
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function handleCompletedTodoRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const { todo } = req.body

  const todoRef = doc(db, 'todos', id as string)
  await updateDoc(todoRef, {
    todo: todo.todo,
    isCompleted: !todo.isCompleted,
  })
    .then((response) => res.status(200).send({ success: true }))
    .catch((error) => res.status(400).send({ success: false }))
}

async function handleUpdateTodoRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const { todo, isCompleted, createdAt } = req.body

  const todoRef = doc(db, 'todos', id as string)
  await updateDoc(todoRef, {
    todo,
    isCompleted,
  })
    .then((response) => res.status(200).send({ success: true }))
    .catch((error) => res.status(400).send(error))
}

async function handleDeleteTodoRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const todoRef = doc(todosCollectionRef, id as string)
  try {
    await deleteDoc(todoRef)
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(400).send({ success: false })
  }
}
