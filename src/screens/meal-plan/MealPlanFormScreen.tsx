'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import type { Selection } from '@heroui/react'
import { Button, Form, Input, Select, SelectItem } from '@heroui/react'

import { TitlePage } from '@/components/page/TitlePage'
import { MealPlanService } from '@/services/meal-plan/MealPlanService'
import { Nutritionist } from '@/models/meal-plan/nutritionists/Nutritionist'
import { Recipe } from '@/models/meal-plan/recipe/Recipe'

interface MealPlanFormScreenProps {
    patientId: string
    nutritionists: Nutritionist[]
    recipes: Recipe[]
}

type DaySelectionMap = Record<string, Selection>

function getSelectionValue(selection: Selection, fallback = '') {
    if (selection === 'all') {
        return fallback
    }

    return Array.from(selection)[0]?.toString() || fallback
}

function getSelectedRecipeIds(selection: Selection) {
    if (selection === 'all') {
        return []
    }

    return Array.from(selection).map((item) => item.toString())
}

function buildDays(startDate: string, durationDays: number) {
    if (!startDate) {
        return []
    }

    const baseDate = new Date(`${startDate}T00:00:00Z`)

    return Array.from({ length: durationDays }, (_, index) => {
        const currentDate = new Date(baseDate)
        currentDate.setUTCDate(baseDate.getUTCDate() + index)

        const dateKey = currentDate.toISOString().slice(0, 10)

        return {
            key: dateKey,
            label: `Día ${index + 1}`,
            date: dateKey,
        }
    })
}

export function MealPlanFormScreen({ patientId, nutritionists, recipes }: MealPlanFormScreenProps) {
    const [nutritionistSelection, setNutritionistSelection] = useState<Selection>(new Set())
    const [startDate, setStartDate] = useState('')
    const [durationDaysSelection, setDurationDaysSelection] = useState<Selection>(new Set(['15']))
    const [selectedRecipesByDay, setSelectedRecipesByDay] = useState<DaySelectionMap>({})
    const [activeDayDate, setActiveDayDate] = useState('')
    const [recipeSearch, setRecipeSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const nutritionistId = getSelectionValue(nutritionistSelection)
    const durationDays = Number(getSelectionValue(durationDaysSelection, '15')) || 15
    const isDaysReady = Boolean(startDate) && durationDays > 0

    const days = useMemo(() => buildDays(startDate, durationDays), [startDate, durationDays])
    const activeDay = useMemo(
        () => days.find((day) => day.date === activeDayDate) || null,
        [activeDayDate, days]
    )

    const filteredRecipes = useMemo(() => {
        const query = recipeSearch.trim().toLowerCase()

        if (!query) {
            return recipes
        }

        return recipes.filter((recipe) => {
            const nameMatch = recipe.nombre.toLowerCase().includes(query)
            const instructionMatch = recipe.instrucciones.toLowerCase().includes(query)

            return nameMatch || instructionMatch
        })
    }, [recipeSearch, recipes])

    useEffect(() => {
        setSelectedRecipesByDay((current) => {
            const nextState: DaySelectionMap = {}

            days.forEach((day) => {
                nextState[day.date] = current[day.date] ?? new Set()
            })

            return nextState
        })
    }, [days])

    const recipeById = useMemo(() => {
        const map = new Map<string, Recipe>()
        recipes.forEach((recipe) => map.set(recipe.id, recipe))
        return map
    }, [recipes])

    const activeDaySelectedRecipes = useMemo(() => {
        if (!activeDay) {
            return new Set<string>()
        }

        return new Set<string>(Array.from(selectedRecipesByDay[activeDay.date] ?? new Set()).map((item) => item.toString()))
    }, [activeDay, selectedRecipesByDay])

    const openDayRecipeModal = (dayDate: string) => {
        setActiveDayDate(dayDate)
        setRecipeSearch('')
    }

    const closeDayRecipeModal = () => {
        setActiveDayDate('')
        setRecipeSearch('')
    }

    const toggleRecipeForActiveDay = (recipeId: string) => {
        if (!activeDay) {
            return
        }

        setSelectedRecipesByDay((current) => {
            const nextSelection = new Set<string>(Array.from(current[activeDay.date] ?? new Set()).map((item) => item.toString()))

            if (nextSelection.has(recipeId)) {
                nextSelection.delete(recipeId)
            } else {
                nextSelection.add(recipeId)
            }

            return {
                ...current,
                [activeDay.date]: nextSelection,
            }
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()

        setError('')
        setSuccess('')

        if (!nutritionistId) {
            setError('Debe seleccionar un nutricionista.')
            return
        }

        if (!startDate) {
            setError('Debe seleccionar la fecha de inicio.')
            return
        }

        if (days.length === 0) {
            setError('Debe seleccionar una duración válida.')
            return
        }

        const hasEmptyDay = days.some((day) => getSelectedRecipeIds(selectedRecipesByDay[day.date] ?? new Set()).length === 0)
        if (hasEmptyDay) {
            setError('Debe seleccionar al menos una receta por cada día.')
            return
        }

        const dietas = days.map((day) => {
            const recipeIds = getSelectedRecipeIds(selectedRecipesByDay[day.date] ?? new Set())

            return {
                fecha: day.date,
                recetas: recipeIds.map((recipeId, index) => {
                    const recipe = recipeById.get(recipeId)

                    return {
                        orden: index + 1,
                        tiempoId: recipe?.tiempoId || 0,
                        recetaId: recipeId,
                    }
                }),
            }
        })

        setLoading(true)

        try {
            await MealPlanService.create('', {
                pacienteId: patientId,
                nutricionistaId: nutritionistId,
                dietas,
                fechaInicio: `${startDate}T00:00:00.000Z`,
                duracionDias: durationDays,
            })

            setSuccess('Plan alimenticio creado correctamente.')
        } catch {
            setError('No se pudo crear el plan alimenticio. Intente nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <TitlePage title="Crear Meal Plan" />
                <Button type="submit" form="meal-plan-form" color="primary" variant="flat" isLoading={loading}>
                    Crear plan alimenticio
                </Button>
            </div>

            <p className="mb-6 text-sm text-slate-500">Paciente seleccionado: {patientId}</p>

            <Form id="meal-plan-form" className="space-y-6 w-full max-w-none" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Select
                        isRequired
                        label="Nutricionista"
                        placeholder="Seleccione un nutricionista"
                        selectedKeys={nutritionistSelection}
                        onSelectionChange={setNutritionistSelection}
                    >
                        {nutritionists.map((nutritionist) => (
                            <SelectItem key={nutritionist.id}>{nutritionist.nombre}</SelectItem>
                        ))}
                    </Select>

                    <Input
                        isRequired
                        type="date"
                        label="Fecha de inicio"
                        value={startDate}
                        onValueChange={setStartDate}
                    />

                    <Select
                        isRequired
                        label="Duración"
                        placeholder="Seleccione duración"
                        selectedKeys={durationDaysSelection}
                        onSelectionChange={setDurationDaysSelection}
                    >
                        <SelectItem key="15">15 días</SelectItem>
                        <SelectItem key="30">30 días</SelectItem>
                    </Select>
                </div>

                <div className="w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50/40 p-4 shadow-sm md:p-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-800">Plan diario de recetas</p>
                        <p className="text-xs text-slate-500">{days.length} días generados</p>
                    </div>

                    {!isDaysReady ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-8 text-center">
                            <p className="text-sm font-medium text-slate-700">Selecciona la duración y fecha de inicio</p>
                            <p className="mt-1 text-xs text-slate-500">Después de eso se mostrarán los días para asignar recetas.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                            {days.map((day) => {
                                const daySelection = selectedRecipesByDay[day.date] ?? new Set()
                                const selectedRecipeIds = getSelectedRecipeIds(daySelection)

                                return (
                                    <div
                                        key={day.date}
                                        className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                    >
                                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">{day.label}</p>
                                                <p className="text-sm text-slate-500">{day.date}</p>
                                            </div>
                                            <Button type="button" size="sm" variant="flat" color="primary" onPress={() => openDayRecipeModal(day.date)}>
                                                Elegir recetas
                                            </Button>
                                        </div>

                                        <div className="min-w-0 space-y-3">
                                            <p className="text-xs text-slate-400">{selectedRecipeIds.length} recetas seleccionadas</p>

                                            <div className="flex min-w-0 flex-wrap gap-2">
                                                {selectedRecipeIds.length === 0 ? (
                                                    <span className="text-sm text-slate-500">No hay recetas seleccionadas</span>
                                                ) : (
                                                    selectedRecipeIds.map((recipeId) => (
                                                        <span
                                                            key={recipeId}
                                                            className="max-w-full truncate rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                                                        >
                                                            {recipeById.get(recipeId)?.nombre || recipeId}
                                                        </span>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {activeDay && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                        <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl bg-white p-6 shadow-2xl">
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Seleccionar recetas</h3>
                                    <p className="text-sm text-slate-500">
                                        {activeDay.label} · {activeDay.date}
                                    </p>
                                </div>

                                <Button type="button" variant="light" onPress={closeDayRecipeModal}>
                                    Cerrar
                                </Button>
                            </div>

                            <Input
                                label="Buscar receta"
                                placeholder="Escribe para filtrar por nombre o instrucciones"
                                value={recipeSearch}
                                onValueChange={setRecipeSearch}
                            />

                            <div className="mt-5 flex-1 overflow-y-auto pr-1">
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {filteredRecipes.map((recipe) => {
                                        const isSelected = activeDaySelectedRecipes.has(recipe.id)

                                        return (
                                            <button
                                                key={recipe.id}
                                                type="button"
                                                onClick={() => toggleRecipeForActiveDay(recipe.id)}
                                                className={`rounded-2xl border p-4 text-left transition ${
                                                    isSelected
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">{recipe.nombre}</p>
                                                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                                                            {recipe.instrucciones}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            isSelected
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-slate-100 text-slate-600'
                                                        }`}
                                                    >
                                                        {isSelected ? 'Seleccionada' : 'Agregar'}
                                                    </span>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>

                                {filteredRecipes.length === 0 && (
                                    <p className="mt-4 text-sm text-slate-500">No hay recetas que coincidan con la búsqueda.</p>
                                )}
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                                <p className="text-sm text-slate-500">
                                    {activeDaySelectedRecipes.size} recetas seleccionadas para este día.
                                </p>

                                <Button type="button" color="primary" variant="flat" onPress={closeDayRecipeModal}>
                                    Terminar selección
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {(error || success) && (
                    <div className="space-y-2">
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {success && <p className="text-sm text-green-600">{success}</p>}
                    </div>
                )}

                <p className="text-sm text-slate-500">
                    La duración determina cuántos días se muestran abajo.
                </p>
            </Form>
        </>
    )
}
