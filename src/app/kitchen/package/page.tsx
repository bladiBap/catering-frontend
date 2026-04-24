import { ContainerPage } from '@/components/page/ContainerPage'
import { PackageListScreen, MOCK_PACKAGES } from '@/screens/kitchen/package/PackageListScreen'
import { PackageDTO } from '@/models/kitchen/packages/Package'
import { PackageService } from '@/services/kitchen/PackageService'

export default async function KitchenPackagePage() {
    let packages: PackageDTO[] = []

    try {
        const response = await PackageService.getAll('', {
            page: 1,
            pageSize: 100,
        })

        packages = response.value
    } catch {
        packages = MOCK_PACKAGES
    }

    return (
        <ContainerPage>
            <PackageListScreen packages={packages} />
        </ContainerPage>
    )
}