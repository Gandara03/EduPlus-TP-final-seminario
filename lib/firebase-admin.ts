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
    
    // Construir service account desde variables separadas
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID || "",
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "",
      private_key: process.env.FIREBASE_PRIVATE_KEY || "",
      client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
      client_id: process.env.FIREBASE_CLIENT_ID || "",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL || ""}`,
      universe_domain: "googleapis.com"
    };
    
    console.log('Service account construido desde variables separadas');
    console.log('Project ID:', serviceAccount.project_id);
    
    if (!serviceAccount.project_id || !serviceAccount.private_key) {
      throw new Error('Variables de Firebase Admin incompletas');
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