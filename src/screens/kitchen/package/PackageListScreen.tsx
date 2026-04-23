import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { PackageCard } from '@/components/kitchen/PackageCard'
import { PackageDTO, StatusPackage } from '@/models/kitchen/packages/Package'

const TODAY = new Date().toISOString().slice(0, 10)

export const MOCK_PACKAGES: PackageDTO[] = [
    {
        id: '42f642dc-6097-4c31-a8c9-49089ae35a9a',
        dateOrdered: `${TODAY}T08:00:00.000Z`,
        dateCreatedOn: `${TODAY}T07:45:00.000Z`,
        status: StatusPackage.CREATED,
        packageItems: [],
    },
    {
        id: 'da3405a8-57b6-4ac8-abeb-2f3e357cd37b',
        dateOrdered: `${TODAY}T12:30:00.000Z`,
        dateCreatedOn: `${TODAY}T12:10:00.000Z`,
        status: StatusPackage.COMPLETED,
        packageItems: [],
    },
]

interface PackageListScreenProps {
    packages: PackageDTO[]
}

export function PackageListScreen({ packages }: PackageListScreenProps) {
    const packagesToday = packages.filter((item) => item.dateOrdered.startsWith(TODAY))

    return (
        <>
            <div className="mb-4 flex flex-row justify-between">
                <TitlePage title="Paquetes" />
            </div>

            <GridContainer emptyMessage="No hay paquetes para mostrar hoy">
                {packagesToday.map((item) => (
                    <PackageCard key={item.id} packageItem={item} />
                ))}
            </GridContainer>
        </>
    )
}