import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Función para inicializar Firebase Admin de forma diferida
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  try {
    const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountRaw) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT no está configurada');
    }

    const serviceAccount = JSON.parse(serviceAccountRaw);
    if (!serviceAccount.project_id) {
      throw new Error('Service account inválido: falta project_id');
    }

    return initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined
    });
  } catch (error) {
    console.error('Error inicializando Firebase Admin:', error);
    throw error;
  }
}

// Exportar la función para inicialización diferida
export const getFirebaseAdmin = () => {
  try {
    return initializeFirebaseAdmin();
  } catch (error) {
    console.error('Error obteniendo Firebase Admin:', error);
    return null;
  }
};

// Exportar Firestore solo cuando se necesite
export const getFirestoreDB = () => {
  const app = getFirebaseAdmin();
  if (!app) {
    throw new Error('Firebase Admin no está inicializado');
  }
  return getFirestore(app);
}; 