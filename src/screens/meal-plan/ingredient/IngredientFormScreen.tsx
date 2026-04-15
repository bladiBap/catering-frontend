'use client'

import { FormEvent, useState } from 'react'
import { Input } from '@heroui/input'
import { Button, Form, Select, SelectItem } from '@heroui/react'

import { TitlePage } from '@/components/page/TitlePage'
import { Category } from '@/models/meal-plan/categories/Category'
import { Ingredient } from '@/models/meal-plan/ingredients/Ingredient'
import { UnitMeasurement } from '@/models/meal-plan/unit-measurement/UnitMeasurement'

interface IngredientFormScreenProps {
    ingredient?: Ingredient
    categories: Category[]
    unitMeasurements: UnitMeasurement[]
}

export function IngredientFormScreen({ ingredient, categories, unitMeasurements }: IngredientFormScreenProps) {
    const [nombre, setNombre] = useState(ingredient?.nombre || '')
    const [calorias, setCalorias] = useState(ingredient?.calorias?.toString() || '')
    const [cantidadValor, setCantidadValor] = useState(
        ingredient?.cantidadValor?.toString() || ''
    )
    const [categoriaId, setCategoriaId] = useState(ingredient?.categoriaId || '')
    const [unidadId, setUnidadId] = useState(ingredient?.unidadId?.toString() || '')

    const createIngredient = () => {
        // TODO: integrar con IngredientService.create
    }

    const updateIngredient = () => {
        // TODO: integrar con IngredientService.update
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (ingredient) {
            updateIngredient()
            return
        }

        createIngredient()
    }

    return (
        <>
            <TitlePage title={ingredient ? 'Editar Ingrediente' : 'Crear Ingrediente'} />

            <Form
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
                onSubmit={handleSubmit}
            >
                <Input
                    isRequired
                    label="Nombre"
                    value={nombre}
                    onValueChange={setNombre}
                    placeholder="Ingrese el nombre del ingrediente"
                />

                <Input
                    isRequired
                    label="Calorias"
                    type="number"
                    value={calorias}
                    onValueChange={setCalorias}
                    placeholder="Ingrese las calorias"
                />

                <Input
                    isRequired
                    label="Cantidad"
                    type="number"
                    value={cantidadValor}
                    onValueChange={setCantidadValor}
                    placeholder="Ingrese la cantidad"
                />

                <Select
                    isRequired
                    label="Categoria"
                    placeholder="Seleccione una categoria"
                    selectedKeys={categoriaId ? [categoriaId] : []}
                    onChange={(e) => setCategoriaId(e.target.value)}
                >
                    {categories.map((category) => (
                        <SelectItem key={category.id}>{category.nombre}</SelectItem>
                    ))}
                </Select>

                <Select
                    isRequired
                    label="Unidad de medida"
                    placeholder="Seleccione una unidad de medida"
                    selectedKeys={unidadId ? [unidadId] : []}
                    onChange={(e) => setUnidadId(e.target.value)}
                >
                    {unitMeasurements.map((unit) => (
                        <SelectItem key={unit.id}>
                            {unit.nombre} ({unit.simbolo})
                        </SelectItem>
                    ))}
                </Select>

                <div className="md:col-span-2 pt-2">
                    <Button type="submit" variant="flat" color="primary" className="w-48">
                        {ingredient ? 'Actualizar' : 'Crear'}
                    </Button>
                </div>
            </Form>
        </>
    )
}