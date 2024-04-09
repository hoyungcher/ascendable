'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import crypto from 'crypto'

interface CredentialResponse {
  credential: string
}

// Generate a random nonce and hash it with SHA-256 for google login
// export async function generateNonce() {
//   const nonce = crypto.randomBytes(16).toString('base64') // Generate a random nonce
//   const encoder = new TextEncoder()
//   const encodedNonce = encoder.encode(nonce) // Encode the nonce
//   const hash = await crypto.subtle.digest('SHA-256', encodedNonce) // Hash it with SHA-256
//   const bytes = new Uint8Array(hash)
//   const hashedNonce = Array.from(bytes)
//     .map((b) => b.toString(16).padStart(2, '0')) // Convert the hash to a hexadecimal string
//     .join('')
//   return { nonce, hashedNonce }
// }

export async function loginWithEmail(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function loginWithGoogle() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: "http://localhost:3000/dashboard"
    },
  })
  if (error) {
    redirect('/error')
  }
  if (data) {
    redirect(data.url)
  }
  redirect('/dashboard')
}

export async function signupWithEmail(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}