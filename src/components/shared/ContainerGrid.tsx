import { Children, ReactNode } from 'react';

interface GridContainerProps {
    children: ReactNode;
    emptyMessage?: string;
}

export function GridContainer({ children, emptyMessage = "No hay elementos para mostrar" }: GridContainerProps)  {

    const hasChildren = Children.count(children) > 0;

    return (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hasChildren ? (
                children
            ) : (
                <div className="col-span-full py-10 text-center text-gray-500 border-2 border-gray-200 rounded-lg h-60">
                    <p>{emptyMessage}</p>
                </div>
            )}
        </div>
    );
};