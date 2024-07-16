"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}



const RegisterForm = ({ user } : { user: User }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })
 
    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);

        try {
            const user = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            };

            const newUser = await createUser(user);

            if (newUser) {
                router.push(`/patients/${newUser.$id}/register`);
            }
        } catch (error) {
        console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className='header'>
                Welcome 👋
            </h1>
            <p className='text-dark-700'>Please let us know more about yourself.</p>
        </section>

         <section className="mb-12 space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className='sub-header'>Personal Information</h2>
            </div>
        </section>


        <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="name"
                label="Full name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
            />

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.PHONE_INPUT}
                name="phone"
                label="Phone Number"
                placeholder="(123) 245-3463"
            />
        </div>

         <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name="birthDate"
                label="Date of Birth"
            />

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.SKELETON}
                name="gender"
                label="Gender"
                renderSkeleton={(field) => (
                    <FormControl>
                        <RadioGroup 
                            className='flex h-11 gap-6 xl:justify-between'
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            {GenderOptions.map((option) => (
                                <div className="radio-group" key={option}>
                                    <RadioGroupItem 
                                        value={option}
                                        id={option}
                                    />
                                    <Label htmlFor={option} className='cursor-pointer'>
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="address"
                label="Address"
                placeholder="Wilshire Blvd, Los Angeles"
            />

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="occupation"
                label="Occupation"
                placeholder="Software Engineer"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="emergencyContactName"
                label="Emergency Contact Name"
                placeholder="Guardian's name"
            />

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.PHONE_INPUT}
                name="emergencyContactNumber"
                label="Emergency Contact Number"
                placeholder="(123) 245-3463"
            />
        </div>

        <section className="mb-12 space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className='sub-header'>Medical Informationn</h2>
            </div>
        </section>

        <CustomFormField 
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a Physician"
        >
            
        </CustomFormField>


        <div className="flex flex-col gap-6 xl:flex-row">
        </div>




            <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
        </Form>
    )
}

export default RegisterForm;