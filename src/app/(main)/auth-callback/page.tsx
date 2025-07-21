"use client"
import { trpc } from '@/app/_trpc/client';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const { data, isLoading, error } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  })

  useEffect(() => {
    if (data?.success) {
      router.push(origin ? `/${origin}` : '/dashboard')
    }
  }, [data, router, origin])

  // Handle error
  useEffect(() => {
    if (error?.data?.code === 'UNAUTHORIZED') {
      router.push('/register')
    }
  }, [error, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isLoading) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
          <h3 className='font-semibold text-xl'>Loading...</h3>
        </div>
      </div>
    )
  }

  if (error && error?.data?.code !== 'UNAUTHORIZED') {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='font-semibold text-xl text-red-600'>
            Authentication Error
          </h3>
          <p>Please try again or contact support.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default page