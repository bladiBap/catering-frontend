import { ReactNode } from 'react';

export function ContainerPage ( {children}: { children: ReactNode }) {
    return (
        <div className="min-h-screen container mx-auto p-4">
            { children }
        </div>
    )
}