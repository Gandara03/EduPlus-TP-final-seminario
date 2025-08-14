import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// Variables para almacenar las instancias de Firebase
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let analytics: any = null;

// Función para inicializar Firebase solo cuando se necesite
function initializeFirebase() {
  if (typeof window === 'undefined') {
    console.log('Firebase: Ejecutándose en servidor, no inicializando');
    return;
  }

  if (app) {
    console.log('Firebase: Ya está inicializado');
    return;
  }

  try {
    console.log('Firebase: Inicializando en cliente...');
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
    };

    // Verificar que tenemos las credenciales necesarias
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      console.warn('Firebase: Credenciales incompletas, no inicializando');
      return;
    }

    // Initialize Firebase
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Analytics solo en producción y cuando esté disponible
    if (process.env.NODE_ENV === 'production' && firebaseConfig.measurementId) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        console.warn('Firebase: Analytics no disponible:', e);
      }
    }

    console.log('Firebase: Inicializado exitosamente');
  } catch (error) {
    console.error('Firebase: Error durante inicialización:', error);
  }
}

// Funciones getter que inicializan Firebase si es necesario
export const getFirebaseApp = () => {
  if (!app) initializeFirebase();
  return app;
};

export const getFirebaseAuth = () => {
  if (!auth) initializeFirebase();
  return auth;
};

export const getFirebaseDB = () => {
  if (!db) initializeFirebase();
  return db;
};

export const getFirebaseStorage = () => {
  if (!storage) initializeFirebase();
  return storage;
};

export const getFirebaseAnalytics = () => {
  if (!analytics) initializeFirebase();
  return analytics;
};

// Exportar las instancias directamente para compatibilidad
export { app, auth, db, analytics, storage };

/**
 * Verifica si el usuario es admin buscando el campo 'role' en la colección 'users'
 */
export async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return data.role === "admin";
    }
    return false;
  } catch (e) {
    return false;
  }
} 