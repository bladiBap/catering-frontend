import { Chip } from "@heroui/chip";
import { BloodType } from '@/enums/patient/BloodType'

const BloodTypes: Record<BloodType, { background: string; text: string }> = {
    [BloodType.A_POSITIVE]: {
        background: 'bg-red-500',
        text: 'A +',
    },
    [BloodType.A_NEGATIVE]: {
        background: 'bg-red-700',
        text: 'A -',
    },
    [BloodType.B_POSITIVE]: {
        background: 'bg-blue-500',
        text: 'B +',
    },
    [BloodType.B_NEGATIVE]: {
        background: 'bg-blue-700',
        text: 'B -',
    },
    [BloodType.AB_POSITIVE]: {
        background: 'bg-purple-500',
        text: 'AB +',
    },
    [BloodType.AB_NEGATIVE]: {
        background: 'bg-purple-700',
        text: 'AB -',
    },
    [BloodType.O_POSITIVE]: {
        background: 'bg-green-500',
        text: 'O +',
    },
    [BloodType.O_NEGATIVE]: {
        background: 'bg-green-700',
        text: 'O -',
    }
}

export function BloodTypeChip({ bloodType }: { bloodType: BloodType }) {

    const blood = BloodTypes[bloodType]

    const getBloodTypeColor = (bloodType: BloodType) => {
        const blood = BloodTypes[bloodType]
        return `${blood.background} text-white`
    }

    return (
        <Chip className={getBloodTypeColor(bloodType)}>
            {blood.text}
        </Chip>
    )
}