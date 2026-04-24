'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Driver } from '@/models/delivery/drivers/Driver'
import { DriverService } from '@/services/delivery/DriverService'

interface DriverDetailScreenProps {
    driver: Driver
}

export function DriverDetailScreen({ driver }: DriverDetailScreenProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleToggleActive = async () => {
        setError('')
        setLoading(true)

        try {
            const response = await DriverService.update('', driver.id, {
                full_name: driver.fullName,
                is_active: !driver.isActive,
            })

            if (!response.isSuccess) {
                setError(response.message || 'No se pudo actualizar el estado del driver.')
                return
            }

            router.refresh()
        } catch {
            setError('No se pudo actualizar el estado del driver.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-sm tracking-wide text-slate-500">Detalle de driver</p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-900">{driver.fullName}</h1>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/delivery/driver"
                        className="h-10 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                    >
                        Volver
                    </Link>
                    <Link
                        href={`/delivery/driver/update/${driver.id}`}
                        className="h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        Editar
                    </Link>
                </div>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="text-slate-400">ID</p>
                        <p className="mt-1 text-slate-800 break-all">{driver.id}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Nombre</p>
                        <p className="mt-1 text-slate-800">{driver.fullName}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Activo</p>
                        <p className="mt-1 text-slate-800">{driver.isActive ? 'Si' : 'No'}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Status</p>
                        <p className="mt-1 text-slate-800">{driver.status}</p>
                    </div>
                </div>
            </section>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleToggleActive}
                    disabled={loading}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? 'Guardando...' : driver.isActive ? 'Desactivar driver' : 'Activar driver'}
                </button>
            </div>
        </div>
    )
}
