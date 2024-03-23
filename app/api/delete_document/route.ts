import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name } = await request.json();
   
    try {
        
        await sql`DELETE FROM documents WHERE name = ${name}`;
      
      
      return NextResponse.json({ name }, { status: 200 });
      
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
}