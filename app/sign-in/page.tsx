import React from 'react'
import { SignIn } from '@stackframe/stack'
import Link from 'next/link'

export default function signInPage() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-100" >
        <div className='max-w-md w-full space-y-8'>
          <SignIn/>
          <Link href="/sign-up">Don't have an account? Sign up</Link>
          <Link href="/">Go back home</Link>

        </div>
      </div>
  )
}
