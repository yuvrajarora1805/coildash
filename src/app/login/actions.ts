'use server'

import pool from '@/lib/db';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RowDataPacket } from 'mysql2';

export async function login(prevState: any, formData: FormData) {
  if (!formData) return { error: 'Invalid form submission' };
  
  const username = formData.get('username') as string;
  const password = formData.get('password') as string; // in a real app, hash and compare

  try {
    // We are querying by name for simplicity based on the dummy seed data
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, role FROM users WHERE name = ?',
      [username]
    );

    if (rows.length === 0) {
      return { error: 'User not found' };
    }

    const user = rows[0];
    
    // Create the session
    const expires = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours
    const session = await encrypt({ user, expires });

    const cookieStore = await cookies();
    cookieStore.set('session', session, { expires, httpOnly: true });

  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Internal Server Error' };
  }

  // Redirect after successful login
  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
