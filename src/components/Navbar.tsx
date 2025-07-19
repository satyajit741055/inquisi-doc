"use client"
import React, { useEffect } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/reduxhooks'
import { checkAuth, logoutUser } from '@/lib/store/authslice'

const Navbar = () => {
    const dispatch = useAppDispatch()
    const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>
    }

    async function logout() {
        try {
            await dispatch(logoutUser()).unwrap()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link
                        href='/'
                        className='flex z-40 font-semibold'>
                        <span>INQUISI-DOC</span>
                    </Link>

                    {/* Add mobile Navbar */}
                    {isAuthenticated ? (
                        <div className='hidden items-center space-x-4 sm:flex'>  {/* Add wrapper */}
                            <Link href='/dashboard' className={buttonVariants({ variant: "ghost",
                                    size: 'sm'})}>
                                Dashboard
                            </Link>
                            <Button onClick={logout} variant="ghost" size="sm">  {/* Match styling */}
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <div className='hidden items-center space-x-4 sm:flex'>
                            <Link className={
                                buttonVariants({
                                    variant: "ghost",
                                    size: 'sm'
                                })
                            }
                                href="/pricing"> Pricing
                            </Link>
                            <Link className={buttonVariants({
                                variant: "ghost",
                                size: 'sm'
                            })}
                                href="/login"> Login
                            </Link>
                            <Link className={buttonVariants({
                                size: 'sm'
                            })}
                                href="/register"> Get started{' '}
                                <ArrowRight className='ml-1.5 h-5 w-5' />
                            </Link>
                        </div>
                    )}

                </div >
            </MaxWidthWrapper >
        </nav >
    )
}

export default Navbar