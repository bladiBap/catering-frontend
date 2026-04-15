'use client'
import { FormEvent, useState } from 'react'
import { Input, Textarea } from '@heroui/input'
import { Form, Button } from '@heroui/react'

import { TitlePage } from '@/components/page/TitlePage'
import { History } from '@/models/patient/histories/History' 
import { Evolution } from '@/models/patient/histories/Evolution'

interface EvolutionFormScreenProps {
    history: History
    evolution?: Evolution
}

export function EvolutionFormScreen({ history, evolution }: EvolutionFormScreenProps) {
    
    const [description, setDescription] = useState(evolution?.description || '')
    const [observation, setObservation] = useState(evolution?.observation || '')
    const [medicOrder, setMedicOrder] = useState(evolution?.medicOrder || '')

    const updateEvolution = () => {
        
    }

    const createEvolution = () => {
        
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (evolution) {
            updateEvolution()
        } else {
            createEvolution()
        }
    }

    return (
        <>
            <TitlePage 
                title={evolution ? "Editar Evolución" : "Registrar Evolución"}
            />
            
            <Form 
                className="grid grid-cols-1 gap-6 max-w-4xl"
                onSubmit={handleSubmit}
            >
                <Textarea
                    isRequired
                    label="Descripción de la Evolución"
                    value={description}
                    onValueChange={setDescription}
                    placeholder="Detalle el estado actual y cambios del paciente..."
                    minRows={4}
                    variant="bordered"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Textarea
                        isRequired
                        label="Observaciones"
                        value={observation}
                        onValueChange={setObservation}
                        placeholder="Observaciones adicionales, hallazgos visuales, etc."
                        minRows={4}
                        variant="bordered"
                    />

                    <Textarea
                        isRequired
                        label="Orden Médica"
                        value={medicOrder}
                        onValueChange={setMedicOrder}
                        placeholder="Prescripciones, exámenes solicitados o indicaciones..."
                        minRows={4}
                        variant="bordered"
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <Button 
                        type="submit" 
                        variant="solid" 
                        color='primary'
                        className='w-full md:w-64'
                    >
                        {evolution ? "Actualizar Registro" : "Guardar Evolución"}
                    </Button>
                </div>
            </Form>
        </>
    )
}