'use client'
import { FormEvent, useState } from 'react'

import { Input, Textarea } from '@heroui/input'
import { Form, Button } from '@heroui/react';

import { TitlePage } from '@/components/page/TitlePage'
import { Patient } from '@/models/patient/patients/Patient';
import { Contact } from '@/models/patient/patients/Contact';

interface ContactScreenScreenProps {
    patient: Patient,
    contact?: Contact
}
export function ContactFormScreen({ patient, contact }: ContactScreenScreenProps) {

    const [direction, setDirection] = useState(contact?.direction || '')
    const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber || '')
    const [floor, setFloor] = useState(contact?.floor || '')
    const [coords, setCoords] = useState(contact?.coords || '')
    const [reference, setReference] = useState(contact?.reference || '')

    const updateContact = () => {

    }

    const createContact = () => {

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (contact) {
            updateContact()
        } else {
            createContact()
        }
    }

    return (
        <>
            <TitlePage title={contact ? "Editar Contacto" : "Crear Contacto"} />
            <Form 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
                onSubmit={handleSubmit}
            >
                <Input
                    isRequired
                    label="Dirección"
                    value={direction}
                    onValueChange={setDirection}
                    placeholder="Ingrese su dirección"
                />

                <Input
                    isRequired
                    label="Número de teléfono"
                    value={phoneNumber}
                    onValueChange={setPhoneNumber}
                    placeholder="Ingrese su número de teléfono"
                />

                <Input
                    isRequired
                    label="Piso"
                    value={floor}
                    onValueChange={setFloor}
                    placeholder="Ingrese el piso"
                />

                <Input
                    isRequired
                    label="Coordenadas"
                    value={coords}
                    onValueChange={setCoords}
                    placeholder="Ingrese sus coordenadas"
                />

                <Textarea
                    isRequired
                    className="col-span-2"
                    label="Referencia"
                    value={reference}
                    onValueChange={setReference}
                    placeholder="Ingrese una referencia para encontrar la dirección"
                    minRows={5}
                    maxRows={5}
                />

                <Button 
                    type="submit" 
                    variant="flat" 
                    color='primary'
                    className='w-48'
                >
                    {contact ? "Actualizar" : "Crear"}
                </Button>
            </Form>
        </>
    )
}