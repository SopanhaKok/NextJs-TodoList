import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../firebase'

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

  const todoRef = db.collection('todos')
  try {
    await todoRef.doc(id as string).update({
      todo: todo.todo,
      isCompleted: !todo.isCompleted,
    })
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(400).send({ success: false })
  }
}

async function handleUpdateTodoRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const { todo, isCompleted, createdAt } = req.body

  const todoRef = db.collection('todos')
  try {
    await todoRef.doc(id as string).update({
      todo,
      isCompleted,
    })
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(400).send({ success: false })
  }
}

function handleDeleteTodoRequest(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const todoRef = db.collection('todos')
  try {
    todoRef.doc(id as string).delete()
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(400).send({ success: false })
  }
}
