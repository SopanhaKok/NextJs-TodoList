import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteDoc, getDocs } from 'firebase/firestore'
import { todosCollectionRef } from '@/app/utils/firestore.collection'
import db from '../../../../firebase'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      handleClearTodosRequest(res)
      break

    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function handleClearTodosRequest(res: NextApiResponse) {
  const todoRef = db.collection('todos')
  const snapshot = await todoRef.get()
  try {
    snapshot.forEach(async (doc) => {
      doc.ref.delete()
    })
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(400).send({ success: false })
  }
}
