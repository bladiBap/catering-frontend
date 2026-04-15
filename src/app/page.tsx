import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
                <p className="text-sm font-medium tracking-[0.2em] text-slate-500">CATERING FRONTEND</p>
                <h1 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
                    Gestion nutricional de pacientes
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-slate-600">
                    Administra historias clinicas, evoluciones y antecedentes en un solo lugar.
                </p>

                <div className="mt-8">
                    <Link
                        href="/patient"
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        Ir al listado de pacientes
                    </Link>
                </div>
            </section>
        </main>
    )
}
