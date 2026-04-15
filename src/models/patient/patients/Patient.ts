import { BloodType } from '@/enums/patient/BloodType';

export interface Patient {
    patientId: string;
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

export interface CreatePatientRequest {
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