'use client'
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

interface AppointmentModalProps {
    type: 'schedule' | 'cancel';
    userId: string;
    appointment?: Appointment
    title: string;
    description: string;
    patientId: string;
}

const AppointmentModal = ({ patientId, userId, appointment, type, title, description} : AppointmentModalProps) => {
    const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost" className={`capitalize ${type === 'schedule' &&  'text-green-500'}`}>{type}</Button>
        </DialogTrigger>
            <DialogContent className='shad-dialog sm:max-w-md'>
                <DialogHeader className='mb-4 space-y-3'>
                    <DialogTitle className='capitalize'>{type}</DialogTitle>
                    <DialogDescription>Please fill in the following details to {type} an appointment</DialogDescription>
                </DialogHeader>

                <AppointmentForm
                    userId={userId}
                    type={type}
                    patientId={patientId}
                    appointment={appointment}
                    setOpen={setOpen}
                />
            </DialogContent>
    </Dialog>
  )
}

export default AppointmentModal