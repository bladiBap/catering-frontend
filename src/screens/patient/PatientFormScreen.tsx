'use client'
import { FormEvent, useState } from 'react'

import type { Selection } from "@heroui/react";
import type { DateValue } from "@internationalized/date";
import { parseDate, getLocalTimeZone } from "@internationalized/date";


import { Input, Textarea } from '@heroui/input'
import { Form, Button } from '@heroui/react';
import { DateInput } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

import { BloodType } from '@/enums/patient/BloodType'
import { TitlePage } from '@/components/page/TitlePage'
import { Patient } from '@/models/patient/Patient';

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

    const [firstName, setFirstName] = useState(patient?.firstName || '')
    const [middleName, setMiddleName] = useState(patient?.middleName || '')
    const [lastName, setLastName] = useState(patient?.lastName || '')
    const [bloodType, setBloodType] = useState<Selection>( new Set([ patient?.bloodType.toString() || BloodType.O_POSITIVE.toString() ]))
    const [documentNumber, setDocumentNumber] = useState(patient?.documentNumber || '')
    const [dateOfBirth, setDateOfBirth] = useState<DateValue | null>(patient?.dateOfBirth ? parseDate(patient.dateOfBirth.toISOString().split('T')[0]) : null)
    const [ocupation, setOcupation] = useState(patient?.ocupation || '')
    const [religion, setReligion] = useState(patient?.religion || '')
    const [alergies, setAlergies] = useState(patient?.alergies || '')

    const updatePatient = () => {

    }

    const createPatient = () => {

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (patient) {
            updatePatient()
        } else {
            createPatient()
        }
    }

    return (
        <>
            <TitlePage title={patient ? "Editar Paciente" : "Crear Paciente"} />
            <Form 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
                onSubmit={handleSubmit}
            >
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
                >
                    {patient ? "Actualizar" : "Crear"}
                </Button>
            </Form>
        </>
    )
}
