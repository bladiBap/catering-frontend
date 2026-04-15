export interface Contact{
    contactId: string;
    patientId: string;
    direction: string;
    phoneNumber: string;
    floor: string;
    coords: string;
    reference: string;
}

export interface CreateContactRequest {
    patientId: string;
    direction: string;
    phoneNumber: string;
    floor: string;
    coords: string;
    reference: string;
}