"use client"

import { useAppSelector } from '@/lib/reduxhooks'
import React from 'react'
import { User, Mail, AlertCircle, Loader2 } from 'lucide-react'

const UserProfile = () => {
  const { user, isAuthenticated, error, loading } = useAppSelector((state) => state.auth)

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Error Loading Profile</h3>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not authenticated state
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto text-center">
          <User className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Not Authenticated</h3>
          <p className="text-yellow-600">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  // Main profile display
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white relative">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30">
                <User className="h-12 w-12 text-white" />
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {user.name || 'Anonymous User'}
                </h1>
                <div className="flex items-center space-x-2 text-blue-100">
                  <Mail className="h-5 w-5" />
                  <span className="text-lg">{user.email || 'No email provided'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="px-8 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Full Name</h3>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {user.name || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</h3>
                  <p className="text-lg font-semibold text-gray-900 mt-1 break-all">
                    {user.email || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional user properties */}
          {user && Object.keys(user).length > 2 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(user)
                    .filter(([key]) => !['name', 'email'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2">
                        <span className="text-gray-600 capitalize font-medium">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Profile Active</span>
            </div>
            <span className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile