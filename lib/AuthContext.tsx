'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { getFirebaseAuth, getFirebaseDB, isUserAdmin } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nombre: string, apellido: string) => Promise<void>;
  logout: () => Promise<void>;
  emailVerified: boolean;
  resendVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    // Solo ejecutar cuando estemos en el cliente
    if (typeof window === 'undefined') return;

    const authInstance = getFirebaseAuth();
    if (!authInstance) {
      console.log('Auth: Firebase no está inicializado aún');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      setUser(user);
      if (user) {
        setEmailVerified(user.emailVerified);
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
        setEmailVerified(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    const authInstance = getFirebaseAuth();
    if (!authInstance) throw new Error('Firebase no está inicializado');
    await signInWithEmailAndPassword(authInstance, email, password);
  };

  const signUp = async (email: string, password: string, nombre: string, apellido: string) => {
    const authInstance = getFirebaseAuth();
    const dbInstance = getFirebaseDB();
    if (!authInstance || !dbInstance) throw new Error('Firebase no está inicializado');
    
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    // Actualizar el perfil del usuario con el nombre completo
    await updateProfile(userCredential.user, {
      displayName: `${nombre} ${apellido}`
    });
    // Crear documento en Firestore
    await setDoc(doc(dbInstance, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      email,
      name: `${nombre} ${apellido}`,
      role: 'user',
      createdAt: serverTimestamp()
    });
    // Enviar email de verificación
    await sendEmailVerification(userCredential.user);
  };

  const resendVerification = async () => {
    const authInstance = getFirebaseAuth();
    if (authInstance?.currentUser) {
      await sendEmailVerification(authInstance.currentUser);
    }
  };

  const logout = async () => {
    const authInstance = getFirebaseAuth();
    if (!authInstance) throw new Error('Firebase no está inicializado');
    await signOut(authInstance);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signUp, logout, emailVerified, resendVerification }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 