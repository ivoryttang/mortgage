//@ts-nocheck
"use server"
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 

export async function authenticate(_currentState: unknown, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
        // Perform authentication logic here
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        if (user.rows[0] && user.password == password){
            // Redirect to /dashboard if authentication is successful
            window.location.href = "/dashboard";
        }
        
    } catch (error) {
        // Handle authentication errors
        return "wrong"
    }
}