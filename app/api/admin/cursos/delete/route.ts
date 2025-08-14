import { NextResponse } from 'next/server';
import { getFirestoreDB } from '@/lib/firebase-admin';

export async function DELETE(req: Request) {
  try {
    const db = getFirestoreDB();
    const { id } = await req.json();
    if (!id) return NextResponse.json({ ok: false, error: 'ID requerido' }, { status: 400 });
    await db.collection('cursos').doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
} 