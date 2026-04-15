import { BloodType } from '@/enums/patient/BloodType';
import { ContainerPage } from '@/components/page/ContainerPage';
import { HistoryFormScreen } from '@/screens/patient/history/HistoryFormScreen';
import { History } from '@/models/patient/histories/History';

export default async function HistoryUpdatePage() {
    const patient = {
        patientId: '3',
        firstName: 'Roberto',
        middleName: 'Carlos',
        lastName: 'Méndez',
        bloodType: BloodType.B_NEGATIVE,
        documentNumber: '4561237890',
        dateOfBirth: new Date(1978, 1, 5),
        ocupation: 'Arquitecto',
        religion: 'Evangélico',
        alergies: 'Ninguna',
    }
    const history: History = {
        historyId: '1',
        patientId: '3',
        foodPlanId: '1',
        reason: 'Control de rutina',
        diagnostic: 'Paciente en buen estado de salud',
        treatment: 'Recomendaciones generales de alimentación saludable'
    }
    
    return (
        <ContainerPage>
            <HistoryFormScreen patient={patient} history={history}                                                      />
        </ContainerPage>
    )
}