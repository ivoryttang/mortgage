import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   
    try {
        
        const documents = await sql`SELECT * FROM documents;`;
      
      
      return NextResponse.json({ documents }, { status: 200 });
      
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
}