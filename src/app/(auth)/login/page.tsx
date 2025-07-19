import LoginForm from '@/components/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <LoginForm />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage