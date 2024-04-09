"use client"

import Script from 'next/script';
import { useEffect, useState } from 'react'
import { loginWithEmail, signupWithEmail, loginWithGoogle } from './actions'

export default function LoginPage() {
  const [emailSignIn, setEmailSignIn] = useState(false);

  return (
    <>
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center items-center bg-blue-500 text-white px-6">
            <h2 className="text-3xl font-bold mb-2">Level Up Your Flying!</h2>
            <p className="text-xl">Track your progress and milestones automatically by uploading your flights.</p>
        </div>
        <div className="flex-1 flex flex-col justify-center px-6">
          {/* <div id="g_id_onload"
              data-client_id="595965009184-hu0kv3a8c81mjc3uj3kkcvhvav1udf57.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="popup"
              data-callback="loginWithGoogle"
              data-nonce=""
              data-auto_prompt="false">
          </div>
          <div className="g_id_signin"
              data-type="standard"
              data-shape="rectangular"
              data-theme="outline"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left">
          </div> */}
          <button onClick={() => setEmailSignIn(true)}>Sign in with email</button>
          <button onClick={() => loginWithGoogle()}>Sign in with Google</button>
          {
            emailSignIn && (
              <form className="max-w-md mx-auto">
                <div>
                  <label htmlFor="email">Email:</label>
                  <input id="email" name="email" type="email" className="w-100 mt-1 px-4 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md" required />
                </div>
                <div className="mt-4">
                  <label htmlFor="password">Password:</label>
                  <input id="password" name="password" type="password" className="w-100 mt-1 px-4 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md" required />
                </div>
                <div className="mt-6" >
                  <button formAction={loginWithEmail}>Log in</button>
                  <button formAction={signupWithEmail}>Sign up</button>
                </div>
              </form>
            )
          }
        </div>
      </div>
      {/* <Script
          src="https://accounts.google.com/gsi/client"
          strategy="lazyOnload" // or "lazyOnload", "beforeInteractive"
      /> */}
    </>

  )
}