import RegisterForm from '@/components/RegisterForm'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join us today and get started
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <RegisterForm />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage