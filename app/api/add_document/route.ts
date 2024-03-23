import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, description, uploadDate, dueDate, status } = await request.json();
   
    try {
        
      await sql`INSERT INTO documents (name, description, upload_date, due_date, status)
      VALUES (${name}, ${description}, ${uploadDate}, ${dueDate}, ${status})`;
      
      const documents = await sql`SELECT * FROM documents;`;
      return NextResponse.json({ documents }, { status: 200 });
      
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
}