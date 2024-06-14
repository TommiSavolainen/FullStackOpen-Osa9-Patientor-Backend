export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
export type DiagnosisEntry = Diagnosis;
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}
export type PublicPatient = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewEntry = Omit<Patient, 'id'>;
export type PatientEntry = Patient;

export type NonSensitiveDiagnosisEntry = Omit<Diagnosis, 'latin'>;