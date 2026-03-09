'use client'
import { FormEvent } from 'react'
import { Form, Input, Button } from '@heroui/react'

export default function LoginScreen() {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">
                Iniciar Sesión
            </h1>
            <Form className="w-full max-w-xs gap-5" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    errorMessage="Por favor ingrese un email válido"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Ingrese su email"
                    type="email"
                />
                <Input
                    isRequired
                    errorMessage="Por favor ingrese su contraseña"
                    label="Contraseña"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    type="password"
                />

                <div className="flex flex-row mt-5 justify-center w-full">
                    <Button type="submit" color="secondary" className="w-56">
                        Iniciar Sesión
                    </Button>
                </div>
            </Form>
        </div>
    )
}
