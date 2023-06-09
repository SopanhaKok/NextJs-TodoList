import { collection } from 'firebase/firestore'
import { db } from './firebase'
export const todosCollectionRef = collection(db, 'todos')
