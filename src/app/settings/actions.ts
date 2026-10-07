'use server';

import { revalidatePath } from 'next/cache';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function createUser(formData: FormData) {
  const session = await getSession();
  
  if (session?.user?.role !== 'section_head') {
    throw new Error('Unauthorized: Only Section Heads can create users.');
  }

  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const password = formData.get('password') as string;

  if (!name || !role || !password) {
    throw new Error('All fields are required.');
  }

  try {
    const connection = await pool.getConnection();
    try {
      // In a real app, hash the password (e.g. using bcrypt).
      // Since this is a demo, we insert it directly or mock a hash.
      const fakeHash = `hashed_${password}`;
      
      await connection.query(
        'INSERT INTO users (name, role, password_hash) VALUES (?, ?, ?)',
        [name, role, fakeHash]
      );
    } finally {
      connection.release();
    }

    revalidatePath('/settings');
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user.' };
  }
}
