'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@heroui/input'
import { Button, Form, Switch } from '@heroui/react'

import { TitlePage } from '@/components/page/TitlePage'
import { Driver, UpdateDriverRequest } from '@/models/delivery/drivers/Driver'
import { DriverService } from '@/services/delivery/DriverService'

interface DriverFormScreenProps {
    driver?: Driver
}

export function DriverFormScreen({ driver }: DriverFormScreenProps) {
    const router = useRouter()
    const [fullName, setFullName] = useState(driver?.fullName ?? '')
    const [isActive, setIsActive] = useState(driver?.isActive ?? true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const isEditMode = Boolean(driver)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setError('')
        setLoading(true)

        try {
            if (isEditMode && driver) {
                const payload: UpdateDriverRequest = {
                    full_name: fullName,
                    is_active: isActive,
                }

                const response = await DriverService.update('', driver.id, payload)
                if (!response.isSuccess) {
                    setError(response.message || 'No se pudo actualizar el driver.')
                    return
                }

                router.push(`/delivery/driver/${driver.id}`)
                return
            }

            const response = await DriverService.create('', {
                full_name: fullName,
            })

            if (!response.isSuccess) {
                setError(response.message || 'No se pudo crear el driver.')
                return
            }

            router.push('/delivery/driver')
        } catch {
            setError('No se pudo guardar el driver. Intente nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <TitlePage title={isEditMode ? 'Actualizar Driver' : 'Crear Driver'} />

            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    label="Nombre completo"
                    value={fullName}
                    onValueChange={setFullName}
                    placeholder="Ingrese el nombre del driver"
                />

                {isEditMode && (
                    <div className="flex items-center pt-6">
                        <Switch isSelected={isActive} onValueChange={setIsActive}>
                            Activo
                        </Switch>
                    </div>
                )}

                {error && (
                    <div className="md:col-span-2">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <div className="md:col-span-2 pt-2">
                    <Button type="submit" variant="flat" color="primary" className="w-56" isLoading={loading}>
                        {isEditMode ? 'Actualizar Driver' : 'Crear Driver'}
                    </Button>
                </div>
            </Form>
        </>
    )
}
