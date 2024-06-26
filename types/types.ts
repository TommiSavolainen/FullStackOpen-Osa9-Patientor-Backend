export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
export interface Entry {
}
export type DiagnosisEntry = Diagnosis;
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export type PublicPatient = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewEntry = Omit<Patient, 'id'>;
export type PatientEntry = Patient;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NonSensitiveDiagnosisEntry = Omit<Diagnosis, 'latin'>;