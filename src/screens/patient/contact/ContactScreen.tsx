import { Patient } from '@/models/patient/Patient';

interface ContactScreenScreenProps {
    patient: Patient
}
export async function ContactScreen({ patient }: ContactScreenScreenProps) {
    return (
        <div>
            <h1>ContactScreen</h1>
        </div>
    )
}