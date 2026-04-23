import { ContainerPage } from '@/components/page/ContainerPage'
import { PackageDetailScreen } from '@/screens/kitchen/package/PackageDetailScreen'
import { PackageDTO, StatusPackage, StatusPackageItem } from '@/models/kitchen/packages/Package'
import { PackageService } from '@/services/kitchen/PackageService'

interface PackageByIdPageProps {
    params: Promise<{ packageId: string }>
}

const MOCK_PACKAGE_DETAILS: PackageDTO[] = [
    {
        id: '42f642dc-6097-4c31-a8c9-49089ae35a9a',
        dateOrdered: '2026-04-18T08:00:00.000Z',
        dateCreatedOn: '2026-04-18T07:45:00.000Z',
        status: StatusPackage.CREATED,
        packageItems: [
            {
                id: 'ca2d2f08-8bf7-497f-bb6e-c5cdf8ff73f1',
                quantity: 2,
                quantityPrepared: 0,
                status: StatusPackageItem.CREATED,
                recipe: {
                    id: 'caf72c2c-18f4-4fd5-8e47-90d67d5abf11',
                    name: 'Avena con frutas',
                    instructions: 'Servir en bowl y agregar fruta fresca picada.',
                    ingredients: [
                        {
                            id: 'c7d2c4c8-50d7-4ef3-98fe-6543687a6c1d',
                            name: 'Avena',
                            measurementUnit: {
                                id: 'cd707f56-7b4c-4e4a-a4cb-7f4dc66358f1',
                                name: 'Gramo',
                                simbol: 'g',
                            },
                        },
                    ],
                },
            },
            {
                id: 'cb8c9e5d1-3f2a-4c6e-9f8b-1a2d3e4f5a2b',
                quantity: 1,
                quantityPrepared: 1,
                status: StatusPackageItem.COMPLETED,
                recipe: {
                    id: 'cc1d2e3f4-5678-4a9b-8c7d-0e1f2a3b4c2d',
                    name: 'Ensalada de pollo',
                    instructions: 'Mezclar todos los ingredientes y servir frio.',
                    ingredients: [
                        {
                            id: 'cd4e5f6a7-8b9c-4d0e-9f1a-2b3c4d5e6f2a',
                            name: 'Pechuga de pollo',
                            measurementUnit: {
                                id: 'ce8f9a0b1-2c3d-4e5f-6g7h-8i9j0k1l2m2n',
                                name: 'Gramo',
                                simbol: 'g',
                            },
                        },
                    ],
                },
            },
        ],
    },
]

export default async function PackageByIdPage({ params }: PackageByIdPageProps) {
    const { packageId } = await params
    let packageItem: PackageDTO | undefined

    try {
        const response = await PackageService.getById('', packageId)
        packageItem = response.data
    } catch {
        packageItem = MOCK_PACKAGE_DETAILS.find((item) => item.id === packageId)
    }

    if (!packageItem) {
        return <ContainerPage>No se encontro el paquete solicitado.</ContainerPage>
    }

    return (
        <ContainerPage>
            <PackageDetailScreen packageItem={packageItem} />
        </ContainerPage>
    )
}