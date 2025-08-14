import { NextResponse } from 'next/server';
import { getFirestoreDB } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const db = getFirestoreDB();
    const snapshot = await db.collection('cursos').get();
    const cursos = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ ok: true, cursos });
  } catch (error) {
    console.error('🔥 ERROR en /api/admin/cursos:', error);
    const err = error as Error;
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
} 