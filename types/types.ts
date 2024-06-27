export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type DiagnosisEntry = Diagnosis;

// Base Entry interface with common fields
interface BaseEntry {
    id: string;
    date: string;
    type: string; // Could be 'Hospital' | 'OccupationalHealth' | 'HealthCheck'
    description: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

// Extend BaseEntry for specific entry types
export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthEntry extends BaseEntry {
    type: 'OccupationalHealth';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating; // 0-3 scale
}

// Union type for all entry types
export type Entry = HospitalEntry | OccupationalHealthEntry | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
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

// Define NewEntry as a union of all new entry types without 'id'
export type NewEntry = Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthEntry, 'id'> | Omit<HealthCheckEntry, 'id'>;
export type PatientEntry = Patient;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NonSensitiveDiagnosisEntry = Omit<Diagnosis, 'latin'>;
// export interface Diagnosis {
//     code: string;
//     name: string;
//     latin?: string;
// }
// export interface Entry {
// }
// export type DiagnosisEntry = Diagnosis;
// export interface Patient {
//     id: string;
//     name: string;
//     dateOfBirth: string;
//     ssn: string;
//     gender: Gender;
//     occupation: string;
//     entries: Entry[];
// }
// export enum Gender {
//     Male = "male",
//     Female = "female",
//     Other = "other"
// }
// export type PublicPatient = Omit<Patient, 'ssn'>;
// export type NewPatientEntry = Omit<Patient, 'id'>;
// export type NewEntry = Omit<Patient, 'id'>;
// export type PatientEntry = Patient;
// export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
// export type NonSensitiveDiagnosisEntry = Omit<Diagnosis, 'latin'>;