'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'
import { PackageDTO, PackageItemDTO, StatusPackage, StatusPackageItem } from '@/models/kitchen/packages/Package'
import { PackageService } from '@/services/kitchen/PackageService'

interface PackageDetailScreenProps {
    packageItem: PackageDTO
}

const STATUS_LABEL: Record<StatusPackage, string> = {
    [StatusPackage.CREATED]: 'Creado',
    [StatusPackage.COMPLETED]: 'Completado',
}

const STATUS_ITEM_LABEL: Record<StatusPackageItem, string> = {
    [StatusPackageItem.CREATED]: 'Pendiente',
    [StatusPackageItem.COMPLETED]: 'Completado',
}

const STATUS_ITEM_CLASSNAME: Record<StatusPackageItem, string> = {
    [StatusPackageItem.CREATED]: 'bg-amber-100 text-amber-700',
    [StatusPackageItem.COMPLETED]: 'bg-emerald-100 text-emerald-700',
}

export function PackageDetailScreen({ packageItem }: PackageDetailScreenProps) {
    const [packageItems, setPackageItems] = useState(packageItem.packageItems)
    const [selectedItem, setSelectedItem] = useState<PackageItemDTO | null>(null)
    const [preparedQuantityInput, setPreparedQuantityInput] = useState('1')
    const [isSavingPreparedQuantity, setIsSavingPreparedQuantity] = useState(false)
    const [preparedQuantityError, setPreparedQuantityError] = useState('')
    const [preparedQuantitySuccess, setPreparedQuantitySuccess] = useState('')

    const selectedItemPendingQuantity = useMemo(() => {
        if (!selectedItem) {
            return 0
        }

        const prepared = selectedItem.quantityPrepared ?? 0
        return Math.max(selectedItem.quantity - prepared, 0)
    }, [selectedItem])

    const openPreparedQuantityModal = (item: PackageItemDTO) => {
        setSelectedItem(item)
        setPreparedQuantityInput('1')
        setPreparedQuantityError('')
        setPreparedQuantitySuccess('')
    }

    const closePreparedQuantityModal = () => {
        if (isSavingPreparedQuantity) {
            return
        }

        setSelectedItem(null)
        setPreparedQuantityInput('1')
        setPreparedQuantityError('')
    }

    const handleSavePreparedQuantity = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!selectedItem) {
            return
        }

        const preparedQuantity = Number(preparedQuantityInput)

        if (!Number.isInteger(preparedQuantity) || preparedQuantity <= 0) {
            setPreparedQuantityError('Ingresa una cantidad valida mayor a 0.')
            return
        }

        if (preparedQuantity > selectedItemPendingQuantity) {
            setPreparedQuantityError(`La cantidad no puede superar lo pendiente (${selectedItemPendingQuantity}).`)
            return
        }

        setIsSavingPreparedQuantity(true)
        setPreparedQuantityError('')

        try {
            const response = await PackageService.addPreparedQuantity('', {
                packageId: packageItem.id,
                packageItemId: selectedItem.id,
                preparedQuantity,
            })

            if (response.value?.packageItems?.length > 0) {
                setPackageItems(response.value.packageItems)
            } else {
                setPackageItems((previousItems) =>
                    previousItems.map((item) => {
                        if (item.id !== selectedItem.id) {
                            return item
                        }

                        const currentPreparedQuantity = item.quantityPrepared ?? 0
                        const nextPreparedQuantity = Math.min(currentPreparedQuantity + preparedQuantity, item.quantity)

                        return {
                            ...item,
                            quantityPrepared: nextPreparedQuantity,
                            status:
                                nextPreparedQuantity >= item.quantity
                                    ? StatusPackageItem.COMPLETED
                                    : StatusPackageItem.CREATED,
                        }
                    }),
                )
            }

            setPreparedQuantitySuccess('Cantidad preparada actualizada correctamente.')
            setSelectedItem(null)
            setPreparedQuantityInput('1')
        } catch {
            setPreparedQuantityError('No se pudo guardar la cantidad preparada. Intenta nuevamente.')
        } finally {
            setIsSavingPreparedQuantity(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-sm tracking-wide text-slate-500">Detalle de paquete</p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-900">Paquete #{packageItem.id}</h1>
                </div>

                <Link
                    href="/kitchen/package"
                    className="h-10 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                >
                    Volver a paquetes
                </Link>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="text-slate-400">Estado</p>
                        <p className="mt-1 text-slate-800">{STATUS_LABEL[packageItem.status]}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Fecha paquete</p>
                        <p className="mt-1 text-slate-800">{new Date(packageItem.dateOrdered).toLocaleString('es-ES')}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Fecha creación</p>
                        <p className="mt-1 text-slate-800">{new Date(packageItem.dateCreatedOn).toLocaleString('es-ES')}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Items</p>
                        <p className="mt-1 text-slate-800">{packageItems.length}</p>
                    </div>
                </div>
            </section>

            <div className="flex items-center justify-between gap-3">
                <TitlePage title="Items del Paquete" />
            </div>

            <div className="space-y-4">
                {packageItems.length === 0 ? (
                    <div className="rounded-lg border-2 border-gray-200 py-10 text-center text-gray-500">
                        No hay items para mostrar
                    </div>
                ) : (
                    packageItems.map((item) => (
                        <article
                            key={item.id}
                            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h2 className="text-lg font-semibold text-slate-900">{item.recipe.name}</h2>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_ITEM_CLASSNAME[item.status]}`}
                                    >
                                        {STATUS_ITEM_LABEL[item.status]}
                                    </span>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                        Cantidad: {item.quantity}
                                    </span>

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                        Preparada: {item.quantityPrepared ?? 0}
                                    </span>
                                </div>
                            </div>

                            <p className="mt-2 text-sm text-slate-600">{item.recipe.instructions}</p>

                            <div className="mt-4 border-t border-slate-100 pt-4">
                                <p className="mb-2 text-sm font-medium text-slate-700">Ingredientes</p>
                                <ul className="space-y-1 text-sm text-slate-600">
                                    {item.recipe.ingredients.map((ingredient) => (
                                        <li key={ingredient.id}>
                                            {ingredient.name} ({ingredient.measurementUnit.simbol})
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {item.status !== StatusPackageItem.COMPLETED && (
                                <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => openPreparedQuantityModal(item)}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                    >
                                        Agregar cantidad preparada
                                    </button>
                                </div>
                            )}
                        </article>
                    ))
                )}
            </div>

            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-slate-900">Agregar cantidad preparada</h3>
                            <p className="mt-1 text-sm text-slate-500">{selectedItem.recipe.name}</p>
                            <p className="mt-1 text-xs text-slate-500">
                                Pendiente: {selectedItemPendingQuantity} de {selectedItem.quantity}
                            </p>
                        </div>

                        <form onSubmit={handleSavePreparedQuantity} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Cantidad preparada a registrar</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={selectedItemPendingQuantity}
                                    value={preparedQuantityInput}
                                    onChange={(event) => setPreparedQuantityInput(event.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
                                />
                            </div>

                            {preparedQuantityError && <p className="text-sm text-red-600">{preparedQuantityError}</p>}

                            <div className="flex flex-wrap justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closePreparedQuantityModal}
                                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSavingPreparedQuantity || selectedItemPendingQuantity === 0}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                                >
                                    {isSavingPreparedQuantity ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {preparedQuantitySuccess && <p className="text-sm text-green-600">{preparedQuantitySuccess}</p>}
        </div>
    )
}