import { NextResponse } from 'next/server';
import { getFirestoreDB } from '@/lib/firebase-admin';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  // Para Next.js 14/15, params puede ser una promesa
  const { id } = await params;
  try {
    const db = getFirestoreDB();
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