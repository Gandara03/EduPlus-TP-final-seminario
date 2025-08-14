import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Usar variable de entorno en lugar de archivo JSON
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

// Inicializar Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore(app); 