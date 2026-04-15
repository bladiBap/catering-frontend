'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Input } from '@heroui/input'
import { Button, Form, Select, SelectItem } from '@heroui/react'

import { TitlePage } from '@/components/page/TitlePage'
import { Course } from '@/models/meal-plan/course/Course'
import { Ingredient } from '@/models/meal-plan/ingredients/Ingredient'
import { Recipe, RecipeIngredient } from '@/models/meal-plan/recipe/Recipe'
import { RecipeService } from '@/services/meal-plan/RecipeService'

interface RecipeFormScreenProps {
    recipe?: Recipe
    ingredients: Ingredient[]
    courses: Course[]
}

export function RecipeFormScreen({ recipe, ingredients, courses }: RecipeFormScreenProps) {
    const [nombre, setNombre] = useState(recipe?.nombre || '')
    const [tiempoId, setTiempoId] = useState(recipe?.tiempoId?.toString() || '')
    const [instrucciones, setInstrucciones] = useState(recipe?.instrucciones || '')

    const [selectedIngredientId, setSelectedIngredientId] = useState('')
    const [selectedCantidad, setSelectedCantidad] = useState('')
    const [ingredienteList, setIngredienteList] = useState<RecipeIngredient[]>(
        recipe?.ingredienteList || []
    )

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const ingredientById = useMemo(() => {
        const map = new Map<string, Ingredient>()
        ingredients.forEach((ingredient) => map.set(ingredient.id, ingredient))
        return map
    }, [ingredients])

    const addIngredient = () => {
        setError('')

        if (!selectedIngredientId || !selectedCantidad) {
            setError('Debe seleccionar un ingrediente y una cantidad.')
            return
        }

        const cantidad = Number(selectedCantidad)
        if (Number.isNaN(cantidad) || cantidad <= 0) {
            setError('La cantidad del ingrediente debe ser mayor a 0.')
            return
        }

        const alreadyExists = ingredienteList.some((item) => item.id === selectedIngredientId)
        if (alreadyExists) {
            setError('El ingrediente ya fue agregado a la receta.')
            return
        }

        setIngredienteList((current) => [
            ...current,
            {
                id: selectedIngredientId,
                cantidadValor: cantidad,
            },
        ])

        setSelectedIngredientId('')
        setSelectedCantidad('')
    }

    const removeIngredient = (ingredientId: string) => {
        setIngredienteList((current) => current.filter((item) => item.id !== ingredientId))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setError('')
        setSuccess('')

        if (ingredienteList.length === 0) {
            setError('Debe agregar al menos un ingrediente a la receta.')
            return
        }

        const parsedTiempoId = Number(tiempoId)
        if (Number.isNaN(parsedTiempoId) || parsedTiempoId <= 0) {
            setError('El tiempo ID debe ser un numero mayor a 0.')
            return
        }

        setLoading(true)

        try {
            if (recipe) {
                await RecipeService.update('', {
                    id: recipe.id,
                    nombre,
                    tiempoId: parsedTiempoId,
                    instrucciones,
                    ingredienteList,
                })
                setSuccess('Receta actualizada correctamente.')
            } else {
                await RecipeService.create('', {
                    nombre,
                    tiempoId: parsedTiempoId,
                    instrucciones,
                    ingredienteList,
                })

                setSuccess('Receta creada correctamente.')
                setNombre('')
                setTiempoId('')
                setInstrucciones('')
                setIngredienteList([])
            }
        } catch {
            setError(
                recipe
                    ? 'No se pudo actualizar la receta. Intente nuevamente.'
                    : 'No se pudo crear la receta. Intente nuevamente.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <TitlePage title={recipe ? 'Actualizar Receta' : 'Crear Receta'} />

            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    label="Nombre"
                    value={nombre}
                    onValueChange={setNombre}
                    placeholder="Ingrese el nombre de la receta"
                />

                <Select
                    isRequired
                    label="Tiempo"
                    placeholder="Seleccione un tiempo"
                    selectedKeys={tiempoId ? [tiempoId] : []}
                    onChange={(e) => setTiempoId(e.target.value)}
                >
                    {courses.map((course) => (
                        <SelectItem key={course.id}>{course.nombre}</SelectItem>
                    ))}
                </Select>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">Instrucciones</label>
                    <textarea
                        required
                        value={instrucciones}
                        onChange={(e) => setInstrucciones(e.target.value)}
                        placeholder="Ingrese las instrucciones de la receta"
                        className="w-full min-h-32 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="md:col-span-2 rounded-lg border border-gray-200 p-4 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Ingredientes de la receta</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                        <Select
                            label="Ingrediente"
                            placeholder="Seleccione un ingrediente"
                            selectedKeys={selectedIngredientId ? [selectedIngredientId] : []}
                            onChange={(e) => setSelectedIngredientId(e.target.value)}
                        >
                            {ingredients.map((ingredient) => (
                                <SelectItem key={ingredient.id}>{ingredient.nombre}</SelectItem>
                            ))}
                        </Select>

                        <Input
                            label="Cantidad"
                            type="number"
                            value={selectedCantidad}
                            onValueChange={setSelectedCantidad}
                            placeholder="Cantidad"
                        />

                        <Button type="button" color="primary" variant="flat" onPress={addIngredient}>
                            Agregar Ingrediente
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {ingredienteList.length === 0 && (
                            <p className="text-sm text-gray-500">Aun no agrego ingredientes.</p>
                        )}

                        {ingredienteList.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
                            >
                                <div className="text-sm text-gray-700">
                                    <span className="font-medium">{ingredientById.get(item.id)?.nombre || item.id}</span>
                                    <span className="ml-2 text-gray-500">Cantidad: {item.cantidadValor}</span>
                                </div>
                                <Button
                                    type="button"
                                    color="danger"
                                    variant="light"
                                    size="sm"
                                    onPress={() => removeIngredient(item.id)}
                                >
                                    Quitar
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {(error || success) && (
                    <div className="md:col-span-2">
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {success && <p className="text-sm text-green-600">{success}</p>}
                    </div>
                )}

                <div className="md:col-span-2 pt-2">
                    <Button type="submit" variant="flat" color="primary" className="w-48" isLoading={loading}>
                        {recipe ? 'Actualizar Receta' : 'Crear Receta'}
                    </Button>
                </div>
            </Form>
        </>
    )
}
