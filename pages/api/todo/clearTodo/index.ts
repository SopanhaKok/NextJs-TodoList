import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteDoc, getDocs } from 'firebase/firestore'
import { todosCollectionRef } from '@/app/utils/firestore.collection'

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
  const querySnapshot = await getDocs(todosCollectionRef)
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })

  return res.status(200).send({ success: true })
}
