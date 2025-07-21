
import authService from '@/appwrite/auth'
import serverAuthService from '@/appwrite/server-auth'
import Dashboard from '@/components/Dashboard'
import { db } from '@/db'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const user = await serverAuthService.getCurrentUser()
  console.log(user)
  if (!user || !user?.$id) redirect('/auth-callback?origin=dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: user.$id
    }
  })

  if (!dbUser) redirect('/auth-callback?origin=dashboard')
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default page
