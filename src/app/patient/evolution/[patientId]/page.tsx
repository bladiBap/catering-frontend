import { ContainerPage } from '@/components/page/ContainerPage';
import { EvolutionFormScreen } from '@/screens/patient/evolution/EvolutionFormScreen';
import { History } from '@/models/patient/histories/History';

export default async function EvolutionCreatePage() {
    
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
            <EvolutionFormScreen history={history} />
        </ContainerPage>
    )
}