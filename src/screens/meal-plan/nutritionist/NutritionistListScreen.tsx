import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { NutritionistCard } from '@/components/meal-plan/NutritionistCard'
import { Nutritionist } from '@/models/meal-plan/nutritionists/Nutritionist'

interface NutritionistListScreenProps {
    nutritionists: Nutritionist[]
}

export function NutritionistListScreen({ nutritionists }: NutritionistListScreenProps) {
    return (
        <>
            <div className="mb-4 flex flex-row justify-between">
                <TitlePage title="Lista de Nutricionistas" />
                <Link
                    href="/meal-plan/nutritionist/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-10"
                >
                    Crear Nutricionista
                </Link>
            </div>

            <GridContainer emptyMessage="No hay nutricionistas para mostrar">
                {nutritionists.map((nutritionist) => (
                    <NutritionistCard key={nutritionist.id} nutritionist={nutritionist} />
                ))}
            </GridContainer>
        </>
    )
}
