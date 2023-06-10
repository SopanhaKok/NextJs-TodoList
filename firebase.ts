import admin from 'firebase-admin'

import serviceAccount from './todo-list-firebase-adminsdk.json'

if (!admin.apps.length) {
  console.log('initilizating')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  })
}

export default admin.firestore()
