import { initializeApp, cert } from 'firebase-admin/app'
import admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

import serviceAccount from './todo-list-firebase-adminsdk.json'

if (!admin.apps.length) {
  console.log('initilizating')
  initializeApp({
    credential: cert(serviceAccount as any),
  })
}

const db = getFirestore()

export default db
