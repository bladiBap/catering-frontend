import { BloodType } from '@/enums/patient/BloodType';

export interface Patient {
    firstName: string;
    middleName: string;
    lastName: string;
    bloodType: BloodType;
    documentNumber: string;
    dateOfBirth: Date;
    ocupation: string;
    religion: string;
    alergies: string;
}