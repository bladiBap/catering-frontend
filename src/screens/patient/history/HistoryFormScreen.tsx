'use client'
import { FormEvent, useState } from 'react'
import { Input, Textarea } from '@heroui/input'
import { Form, Button } from '@heroui/react'

import { TitlePage } from '@/components/page/TitlePage'
import { Patient } from '@/models/patient/patients/Patient'
import { History } from '@/models/patient/histories/History'

interface HistoryFormScreenProps {
    patient: Patient
    history?: History
}

export function HistoryFormScreen({ patient, history }: HistoryFormScreenProps) {

    const [reason, setReason] = useState(history?.reason || '')
    const [diagnostic, setDiagnostic] = useState(history?.diagnostic || '')
    const [treatment, setTreatment] = useState(history?.treatment || '')

    const updateHistory = () => {
        
    }

    const createHistory = () => {
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (history) {
            updateHistory()
        } else {
            createHistory()
        }
    }

    return (
        <>
            <TitlePage 
                title={history ? "Editar Historia Clínica" : "Nueva Historia Clínica"}
            />
            
            <Form 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
                onSubmit={handleSubmit}
            >
                <Input
                    isRequired
                    className="col-span-2"
                    label="Motivo de la consulta"
                    value={reason}
                    onValueChange={setReason}
                    placeholder="Ej. Control de rutina, dolor abdominal..."
                />

                <Textarea
                    isRequired
                    className="col-span-2 md:col-span-1"
                    label="Diagnóstico"
                    value={diagnostic}
                    onValueChange={setDiagnostic}
                    placeholder="Descripción del diagnóstico médico"
                    minRows={6}
                />

                <Textarea
                    isRequired
                    className="col-span-2 md:col-span-1"
                    label="Tratamiento"
                    value={treatment}
                    onValueChange={setTreatment}
                    placeholder="Plan de acción y medicación"
                    minRows={6}
                />

                <div className="col-span-2 flex justify-end gap-2">
                    <Button 
                        type="submit" 
                        variant="flat" 
                        color='primary'
                        className='w-48'
                    >
                        {history ? "Actualizar Historia" : "Guardar Historia"}
                    </Button>
                </div>
            </Form>
        </>
    )
}