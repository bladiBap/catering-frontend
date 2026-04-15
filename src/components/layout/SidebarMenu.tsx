import Link from 'next/link'

export function SidebarMenu() {
    return (
        <aside className="w-72 shrink-0 border-r border-gray-200 bg-white p-6">
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                <p className="text-sm text-gray-500">Navegacion principal</p>
            </div>

            <nav className="space-y-6">
                <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Pacientes
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/patient"
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                            >
                                Pacientes
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/patient/history"
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                            >
                                Historia clinica
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Plan alimenticio
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/meal-plan/ingredient"
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                            >
                                Ingredientes
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/meal-plan/nutritionist"
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                            >
                                Nutricionistas
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/meal-plan/recipe"
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                            >
                                Recetas
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    )
}