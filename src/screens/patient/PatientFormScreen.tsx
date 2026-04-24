'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { Selection } from "@heroui/react";
import type { DateValue } from "@internationalized/date";
import { parseDate, getLocalTimeZone } from "@internationalized/date";


import { Input, Textarea } from '@heroui/input'
import { Form, Button } from '@heroui/react';
import { DateInput } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

import { BloodType } from '@/enums/patient/BloodType'
import { TitlePage } from '@/components/page/TitlePage'
import { CreatePatientRequest, Patient } from '@/models/patient/patients/Patient';
import { PatientService } from '@/services/patient/PatientService';

const bloodTypes = [
    { key: BloodType.A_POSITIVE.toString() , label: 'A +' },
    { key: BloodType.A_NEGATIVE.toString() , label: 'A -' },
    { key: BloodType.B_POSITIVE.toString() , label: 'B +' },
    { key: BloodType.B_NEGATIVE.toString() , label: 'B -' },
    { key: BloodType.AB_POSITIVE.toString() , label: 'AB +' },
    { key: BloodType.AB_NEGATIVE.toString() , label: 'AB -' },
    { key: BloodType.O_POSITIVE.toString() , label: 'O +' },
    { key: BloodType.O_NEGATIVE.toString() , label: 'O -' },
]

interface PatientCreateScreenProps {
    patient?: Patient
}

export function PatientFormScreen({ patient }: PatientCreateScreenProps) {
    const router = useRouter()

    const [firstName, setFirstName] = useState(patient?.firstName || '')
    const [middleName, setMiddleName] = useState(patient?.middleName || '')
    const [lastName, setLastName] = useState(patient?.lastName || '')
    const [bloodType, setBloodType] = useState<Selection>( new Set([ patient?.bloodType.toString() || BloodType.O_POSITIVE.toString() ]))
    const [documentNumber, setDocumentNumber] = useState(patient?.documentNumber || '')
    const [dateOfBirth, setDateOfBirth] = useState<DateValue | null>(patient?.dateOfBirth ? parseDate(patient.dateOfBirth.toISOString().split('T')[0]) : null)
    const [ocupation, setOcupation] = useState(patient?.ocupation || '')
    const [religion, setReligion] = useState(patient?.religion || '')
    const [alergies, setAlergies] = useState(patient?.alergies || '')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const getSelectedBloodType = (): BloodType => {
        const selected = Array.from(bloodType)[0]
        if (!selected) {
            return BloodType.O_POSITIVE
        }

        return Number(selected) as BloodType
    }

    const updatePatient = async () => {
        setErrorMessage('')
        setIsSubmitting(true)

        try {
            if (!patient?.id) {
                setErrorMessage('No se encontro el paciente a editar.')
                return
            }

            if (!dateOfBirth) {
                setErrorMessage('La fecha de nacimiento es obligatoria.')
                return
            }

            const payload: Patient = {
                id: patient.id,
                firstName,
                middleName,
                lastName,
                bloodType: getSelectedBloodType(),
                documentNumber,
                dateOfBirth: dateOfBirth.toDate(getLocalTimeZone()),
                ocupation,
                religion,
                alergies,
            }

            const response = await PatientService.update('', payload)
            if (!response.isSuccess) {
                setErrorMessage(response.message || 'No se pudo actualizar el paciente.')
                return
            }

            router.push(`/patient/${patient.id}`)
        } catch {
            setErrorMessage('Ocurrio un error al actualizar el paciente.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const createPatient = async () => {
        setErrorMessage('')
        setIsSubmitting(true)

        try {
            if (!dateOfBirth) {
                setErrorMessage('La fecha de nacimiento es obligatoria.')
                return
            }

            const payload: CreatePatientRequest = {
                firstName,
                middleName,
                lastName,
                bloodType: getSelectedBloodType(),
                documentNumber,
                dateOfBirth: dateOfBirth.toDate(getLocalTimeZone()).toISOString().split('T')[0],
                ocupation,
                religion,
                alergies,
            }

            const response = await PatientService.create('', payload)
            if (!response.isSuccess) {
                setErrorMessage(response.message || 'No se pudo crear el paciente.')
                return
            }

            router.push('/patient')
        } catch {
            setErrorMessage('Ocurrio un error al crear el paciente.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (patient) {
            await updatePatient()
        } else {
            await createPatient()
        }
    }

    return (
        <>
            <TitlePage title={patient ? "Editar Paciente" : "Crear Paciente"} />
            <Form 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
                onSubmit={handleSubmit}
            >
                {errorMessage && (
                    <p className="md:col-span-2 text-sm text-red-600">{errorMessage}</p>
                )}
                <Input
                    isRequired
                    label="Nombre"
                    value={firstName}
                    onValueChange={setFirstName}
                    placeholder="Ingrese su nombre"
                />

                <Input
                    isRequired
                    label="Segundo Nombre"
                    value={middleName}
                    onValueChange={setMiddleName}
                    placeholder="Ingrese su segundo nombre"
                />

                <Input
                    isRequired
                    label="Apellido"
                    value={lastName}
                    onValueChange={setLastName}
                    placeholder="Ingrese su apellido"
                />

                <Select
                    label="Tipo de sangre"
                    placeholder="Seleccione un tipo de sangre"
                    selectedKeys={bloodType}
                    onSelectionChange={setBloodType}
                >
                    {bloodTypes.map((bloodType) => (
                        <SelectItem key={bloodType.key}>{bloodType.label}</SelectItem>
                    ))}
                </Select>

                <Input
                    isRequired
                    label="Número de documento"
                    value={documentNumber}
                    onValueChange={setDocumentNumber}
                    placeholder="Ingrese su número de documento"
                />

                <DateInput
                    isRequired
                    label="Fecha de nacimiento"
                    value={dateOfBirth}
                    onChange={setDateOfBirth}
                    minValue={parseDate("1900-01-01")}
                    maxValue={parseDate("2024-12-31")}
                />

                <Input
                    isRequired
                    label="Ocupación"
                    value={ocupation}
                    onValueChange={setOcupation}
                    placeholder="Ingrese su ocupación"
                />

                <Input
                    isRequired
                    label="Religión"
                    value={religion}
                    onValueChange={setReligion}
                    placeholder="Ingrese su religión"
                />

                <Textarea
                    isRequired
                    className="col-span-2"
                    label="Alergias"
                    value={alergies}
                    onValueChange={setAlergies}
                    placeholder="Ingrese sus alergias"
                    minRows={5}
                    maxRows={5}
                />

                <Button 
                    type="submit" 
                    variant="flat" 
                    color='primary'
                    className='w-48'
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                >
                    {patient ? "Actualizar" : "Crear"}
                </Button>
            </Form>
        </>
    )
}
