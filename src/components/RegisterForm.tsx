'use client'
import { useAppDispatch, useAppSelector } from '@/lib/reduxhooks'
import { clearError, registerUser } from '@/lib/store/authslice'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (error) dispatch(clearError())
    
    try {
      await dispatch(registerUser({ name, email, password })).unwrap()
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Register</h2>
        <p className="text-gray-600 mt-2">Fill in your details to create an account</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.5 6.5m3.378 3.378a3 3 0 004.243 4.243m-4.242-4.242L12 12m-4.242-4.242l-4.243-4.243m0 0L2 2m1.515 1.515L20.485 20.485" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Password should be at least 8 characters long
          </p>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transform hover:scale-[1.02] active:scale-[0.98]'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </div>
        ) : (
          'Create Account'
        )}
      </button>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          By creating an account, you agree to our{' '}
          <a href="/terms" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Privacy Policy
          </a>
        </p>
      </div>
    </form>
  )
}