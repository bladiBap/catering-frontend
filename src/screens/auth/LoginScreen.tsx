'use client'
import { FormEvent, useState } from 'react'
import { Form, Input, Button } from '@heroui/react'
import { AuthenticationService } from '@/services/auth/AuthenticationService'
import { useRouter } from 'next/navigation'

export default function LoginScreen() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const formData = new FormData(e.currentTarget)
        const username = String(formData.get('email') ?? '')
        const password = String(formData.get('password') ?? '')

        setIsLoading(true)
        try {
            const response = await AuthenticationService.login(username, password)
            if (response.isSuccess) {
                router.push('/')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">
                Iniciar Sesión
            </h1>
            <Form className="w-full max-w-xs gap-5" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    errorMessage="Por favor ingrese su username"
                    label="Username"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Ingrese su username"
                    isDisabled={isLoading}
                />
                <Input
                    isRequired
                    errorMessage="Por favor ingrese su contraseña"
                    label="Contraseña"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    type="password"
                    isDisabled={isLoading}
                />

                <div className="flex flex-row mt-5 justify-center w-full">
                    <Button type="submit" color="secondary" className="w-56" isLoading={isLoading} isDisabled={isLoading}>
                        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}
