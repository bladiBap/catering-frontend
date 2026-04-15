'use client'
import { FormEvent, useState } from 'react'
import { Textarea } from '@heroui/input'
import { Form, Button } from '@heroui/react'

import { TitlePage } from '@/components/page/TitlePage'
import { History } from '@/models/patient/histories/History'
import { Background } from '@/models/patient/histories/Background'

interface BackgroundFormScreenProps {
    history: History
    background?: Background
}

export function BackgroundFormScreen({ history, background }: BackgroundFormScreenProps) {
    
    const [description, setDescription] = useState(background?.description || '')

    const updateBackground = () => {
        console.log("Actualizando antecedentes...", { description });
    }

    const createBackground = () => {
        console.log("Creando antecedentes para la historia:", history.historyId, { 
            description 
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (background) {
            updateBackground()
        } else {
            createBackground()
        }
    }

    return (
        <>
            <TitlePage 
                title={background ? "Editar Antecedentes" : "Registrar Antecedentes"}
            />
            
            <Form 
                className="flex flex-col gap-6 max-w-4xl"
                onSubmit={handleSubmit}
            >
                <Textarea
                    isRequired
                    label="Descripción de Antecedentes"
                    value={description}
                    onValueChange={setDescription}
                    placeholder="Detalle antecedentes patológicos, familiares, quirúrgicos, etc."
                    minRows={10}
                    variant="flat"
                    labelPlacement="outside"
                    className="text-lg"
                />

                <div className="flex justify-start">
                    <Button 
                        type="submit" 
                        variant="solid" 
                        color='primary'
                        className='w-full md:w-64'
                    >
                        {background ? "Actualizar Antecedentes" : "Guardar Antecedentes"}
                    </Button>
                </div>
            </Form>
        </>
    )
}