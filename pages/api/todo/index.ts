import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../firebase'
import { Todo } from '@/app/Type'
import { v4 as uuidv4 } from 'uuid'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get Todo
      handleGetTodoRequest(res)
      break
    case 'POST':
      // Create Todo
      handleCreateTodoRequest(req, res)
      break
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function handleGetTodoRequest(res: NextApiResponse) {
  const todoRef = db.collection('todos')
  const snapshot = await todoRef.get()
  try {
    const todos: Todo[] = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      const timestamp = data.createdAt.toDate()
      todos.push({
        id: data.id,
        isCompleted: data.isCompleted,
        todo: data.todo,
        createdAt: timestamp,
      })
    })
    return res.status(200).send({ success: true, todos })
  } catch (error) {
    console.log(error)
    return res.status(400).send({ success: false })
  }
}

async function handleCreateTodoRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { todo, isCompleted } = req.body
  const id = uuidv4()
  try {
    const todoRef = db.collection('todos').doc(id)
    await todoRef.set({
      id,
      todo,
      isCompleted,
      createdAt: new Date(),
    })
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(400).send({ success: false })
  }
}
