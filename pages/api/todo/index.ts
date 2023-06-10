import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/app/utils/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
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
  const todosCollection = collection(db, 'todos')
  getDocs(todosCollection)
    .then((response) => {
      const todos = response.docs.map((doc) => {
        const data = doc.data()
        const timestamp = data.createdAt.toDate()
        return {
          id: doc.id,
          ...data,
          createdAt: timestamp,
        }
      })
      return res.status(200).send(todos)
    })
    .catch((error) => {
      return res.status(400).send(error)
    })
}

async function handleCreateTodoRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { todo, isCompleted } = req.body

  try {
    await addDoc(collection(db, 'todo'), {
      id: uuidv4(),
      todo,
      isCompleted,
      createdAt: new Date(),
    })
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(400).send({ success: false })
  }
}
