import { BloodType } from '@/enums/patient/BloodType';
import { ContainerPage } from '@/components/page/ContainerPage';
import { History } from '@/models/patient/histories/History';
import { EvolutionFormScreen } from '@/screens/patient/evolution/EvolutionFormScreen';
import { Evolution } from '@/models/patient/histories/Evolution';

export default async function ContactUpdatePage() {
    
    const history: History = {
        historyId: '1',
        patientId: '3',
        foodPlanId: '1',
        reason: 'Control de rutina',
        diagnostic: 'Paciente en buen estado de salud',
        treatment: 'Recomendaciones generales de alimentación saludable'
    }

    const evolution: Evolution = {
        evolutionId: '1',
        historyId: '1',
        description: 'Paciente presenta mejoría significativa en su estado de salud, con una dieta equilibrada y actividad física regular.',
        observation: 'Se recomienda continuar con el plan alimenticio actual y realizar seguimiento mensual.',
        medicOrder: 'Ninguna medicación prescrita en esta evolución.'
    }
    
    return (
        <ContainerPage>
            <EvolutionFormScreen history={history} evolution={evolution}/>
        </ContainerPage>
    )
}