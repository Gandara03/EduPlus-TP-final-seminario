import { NextResponse } from 'next/server';
import { getFirestoreDB } from '@/lib/firebase-admin';

export async function GET() {
  try {
    console.log('API /api/cursos: Iniciando...');
    
    const db = getFirestoreDB();
    console.log('API /api/cursos: Firestore DB obtenido correctamente');
    
    const snapshot = await db.collection('cursos').get();
    console.log('API /api/cursos: Snapshot obtenido, docs count:', snapshot.docs.length);
    
    const cursos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log('API /api/cursos: Cursos procesados, count:', cursos.length);
    return NextResponse.json({ cursos });
  } catch (error) {
    console.error('API /api/cursos: Error detallado:', error);
    return NextResponse.json({ 
      error: 'Error al obtener cursos',
      details: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 