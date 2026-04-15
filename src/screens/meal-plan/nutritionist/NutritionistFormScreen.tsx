'use client'

import { FormEvent, useState } from 'react'
import { Input } from '@heroui/input'
import { Button, Form, Switch } from '@heroui/react'

import { TitlePage } from '@/components/page/TitlePage'
import { NutritionistService } from '@/services/meal-plan/NutritionistService'

export function NutritionistFormScreen() {
    const [nombre, setNombre] = useState('')
    const [activo, setActivo] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setError('')
        setSuccess('')
        setLoading(true)

        try {
            await NutritionistService.create('', {
                nombre,
                activo,
            })

            setSuccess('Nutricionista creado correctamente.')
            setNombre('')
            setActivo(true)
        } catch {
            setError('No se pudo crear el nutricionista. Intente nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <TitlePage title="Crear Nutricionista" />

            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    label="Nombre"
                    value={nombre}
                    onValueChange={setNombre}
                    placeholder="Ingrese el nombre del nutricionista"
                />

                <div className="flex items-center pt-6">
                    <Switch isSelected={activo} onValueChange={setActivo}>
                        Activo
                    </Switch>
                </div>

                {(error || success) && (
                    <div className="md:col-span-2">
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {success && <p className="text-sm text-green-600">{success}</p>}
                    </div>
                )}

                <div className="md:col-span-2 pt-2">
                    <Button type="submit" variant="flat" color="primary" className="w-56" isLoading={loading}>
                        Crear Nutricionista
                    </Button>
                </div>
            </Form>
        </>
    )
}
