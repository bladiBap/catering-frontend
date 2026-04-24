import { ContainerPage } from '@/components/page/ContainerPage'
import { Nutritionist } from '@/models/meal-plan/nutritionists/Nutritionist'
import { NutritionistService } from '@/services/meal-plan/NutritionistService'
import { NutritionistListScreen } from '@/screens/meal-plan/nutritionist/NutritionistListScreen'
import { cookies } from 'next/headers'

export default async function NutritionistListPage() {
    const token = (await cookies()).get('auth_token')?.value ?? ''
    let nutritionists: Nutritionist[] = []

    try {
        const response = await NutritionistService.getAll(token, {
            page: 1,
            pageSize: 20,
        })

        const value = response.value as unknown
        if (Array.isArray(value)) {
            nutritionists = value as Nutritionist[]
        } else if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            nutritionists = ((value as { items?: Nutritionist[] }).items ?? [])
        }
    } catch {
        nutritionists = []
    }

    return (
        <ContainerPage>
            <NutritionistListScreen nutritionists={nutritionists} />
        </ContainerPage>
    )
}
