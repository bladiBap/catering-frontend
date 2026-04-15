import Link from 'next/link';
import { Contact } from '@/models/patient/patients/Contact';

interface ContactCardProps {
    contact: Contact;
    patientId: string | number;
}

export function ContactCard({ contact, patientId }: ContactCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                    Contacto #{contact.contactId}
                </h2>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                    <span className="w-24 shrink-0 text-slate-400">Direccion</span>
                    <span>{contact.direction}</span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                        <span className="w-24 shrink-0 text-slate-400 sm:w-auto">Piso</span>
                        <span>{contact.floor || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">Coords</span>
                        <span className="truncate text-xs font-mono">{contact.coords}</span>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <span className="w-24 shrink-0 text-slate-400">Referencia</span>
                    <span>{contact.reference}</span>
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
                    <span className="w-24 shrink-0 text-slate-400">Telefono</span>
                    <span className="font-medium text-slate-900">{contact.phoneNumber}</span>
                </div>
            </div>

            <Link 
                href={`/patient/contact/${patientId}/update/${contact.contactId}`} 
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg border border-blue-600 px-4 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
                Editar contacto
            </Link>
        </div>
    );
};