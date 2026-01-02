import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB9UO_qKE_YRGfeWvH8SJgKCvutYBn0rts",
  authDomain: "jeffry-in.firebaseapp.com",
  databaseURL: "https://jeffry-in-default-rtdb.firebaseio.com",
  projectId: "jeffry-in",
  storageBucket: "jeffry-in.firebasestorage.app",
  messagingSenderId: "1033268998056",
  appId: "1:1033268998056:web:bf82c3ef4013c9a227779d",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);
