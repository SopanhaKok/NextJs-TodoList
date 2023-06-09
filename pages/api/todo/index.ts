import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/app/utils/firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { todosCollectionRef } from '@/app/utils/firestore.collection'
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
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function handleGetTodoRequest(res: NextApiResponse) {
  const todosCollection = collection(db, 'todos')
  getDocs(todosCollection)
    .then((response) => {
      const todos = response.docs.map((doc) => {
        const data = doc.data()
        const timestamp = data.createdAt.toDate() // Retrieve the timestamp in milliseconds
        return {
          id: doc.id,
          ...data,
          createdAt: timestamp, // Replace the timestamp field with the actual timestamp
        }
      })
      res.status(200).send(todos)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

async function handleCreateTodoRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { todo, isCompleted } = req.body

  const todoRef = doc(todosCollectionRef, uuidv4())
  await setDoc(todoRef, {
    todo,
    isCompleted,
    createdAt: new Date(),
  })
  res.status(200).send({ success: true })
}
