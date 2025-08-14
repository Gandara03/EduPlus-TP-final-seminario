import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Función para inicializar Firebase Admin de forma diferida
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    console.log('Firebase Admin ya está inicializado, reutilizando app existente');
    return getApps()[0];
  }

  try {
    console.log('Inicializando Firebase Admin...');
    
    const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountRaw) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT no está configurada');
    }

    const serviceAccount = JSON.parse(serviceAccountRaw);
    console.log('Service account parseado correctamente, keys:', Object.keys(serviceAccount));
    
    if (!serviceAccount.project_id) {
      throw new Error('Service account inválido: falta project_id');
    }

    const app = initializeApp({
      credential: cert(serviceAccount as any),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined
    });
    
    console.log('Firebase Admin inicializado exitosamente');
    return app;
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
    throw error; // Cambiamos para que no retorne null
  }
};

// Exportar Firestore solo cuando se necesite
export const getFirestoreDB = () => {
  try {
    const app = getFirebaseAdmin();
    return getFirestore(app);
  } catch (error) {
    console.error('Error en getFirestoreDB:', error);
    throw new Error(`Firebase Admin no está inicializado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}; 