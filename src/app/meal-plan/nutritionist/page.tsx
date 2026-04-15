import { ContainerPage } from '@/components/page/ContainerPage'
import { Nutritionist } from '@/models/meal-plan/nutritionists/Nutritionist'
import { NutritionistService } from '@/services/meal-plan/NutritionistService'
import { NutritionistListScreen } from '@/screens/meal-plan/nutritionist/NutritionistListScreen'

const MOCK_NUTRITIONISTS: Nutritionist[] = [
    {
        id: '6c54b71f-4a1b-47c1-aca4-0ceca607d5eb',
        nombre: 'Andres Castro',
        fechaCreacion: '2024-01-01T21:47:20Z',
        activo: true,
    },
]

export default async function NutritionistListPage() {
    let nutritionists: Nutritionist[] = []

    try {
        const response = await NutritionistService.getAll('', {
            page: 1,
            pageSize: 20,
        })

        nutritionists = response.data
    } catch {
        nutritionists = MOCK_NUTRITIONISTS
    }

    return (
        <ContainerPage>
            <NutritionistListScreen nutritionists={nutritionists} />
        </ContainerPage>
    )
}
