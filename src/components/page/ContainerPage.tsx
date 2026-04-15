import { ReactNode } from 'react';

export function ContainerPage ( {children}: { children: ReactNode }) {
    return (
        <div className="min-h-screen container mx-auto px-4 py-8">
            { children }
        </div>
    )
}