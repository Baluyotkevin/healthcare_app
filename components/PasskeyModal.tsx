'use client';

import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { encryptKey } from '@/lib/utils';

const PasskeyModal = () => {
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        if (path) {
            if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setOpen(false)
                router.push('/admin')
            } else {
                setOpen(true)
            }
        }
    }, [encryptedKey])

    const closeModal = () => {
        setOpen(false)
        router.push('/')
    }

    const validatePasskey = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log('hello')
        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey)

            localStorage.setItem('accessKey', encryptedKey)

            setOpen(false)
        } else {
            setError('Invalid passkey. Please try again.')
        }

    }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='shad-alert-dialog'>
            <AlertDialogHeader>
                <AlertDialogTitle className='flex items-start justify-between'>
                    Admin Access Verification
                    <Image 
                        src="/assets/icons/close.svg"
                        alt='close'
                        width={20}
                        height={20}
                        onClick={() => closeModal()}
                        className='cursor-pointer'
                    />
                </AlertDialogTitle>
                <AlertDialogDescription>
                    To access admin page, please enter the passkey
                </AlertDialogDescription>
            </AlertDialogHeader>

                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className='shad-otp' >
                            <InputOTPSlot className='shad-otp-slot' index={0} />
                            <InputOTPSlot className='shad-otp-slot' index={1} />
                            <InputOTPSlot className='shad-otp-slot' index={2} />
                            <InputOTPSlot className='shad-otp-slot' index={3} />
                            <InputOTPSlot className='shad-otp-slot' index={4} />
                            <InputOTPSlot className='shad-otp-slot' index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
                </div>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={(e) => setPasskey(e)} className='shad-primary-btn w-full'>
                        Enter Passkey
                    </AlertDialogAction>
                </AlertDialogFooter>

        </AlertDialogContent>
    </AlertDialog>
  )
}

export default PasskeyModal