import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || ""
  });
}
const db = getFirestore();

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  // Para Next.js 14/15, params puede ser una promesa
  const { id } = await params;
  try {
    const docRef = db.collection('cursos').doc(id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Curso no encontrado' }, { status: 404 });
    }
    const cursoData = { id: docSnap.id, ...docSnap.data() };
    console.log('Datos del curso obtenidos:', {
      id: cursoData.id,
      nombre: (cursoData as any).nombre,
      materiales: (cursoData as any).materiales
    });
    return NextResponse.json(cursoData);
  } catch (error) {
    console.error('🔥 ERROR en /api/cursos/[id]:', error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Error al obtener el curso', details: errMsg }, { status: 500 });
  }
} 