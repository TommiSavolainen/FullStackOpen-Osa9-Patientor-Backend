import patientsData from '../data/patients';
import { PatientEntry, PublicPatient, NewPatientEntry, Entry } from '../types/types';
import { v1 as uuid } from 'uuid';


const patients: PatientEntry[] = patientsData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation } ) => ({
    id, name, dateOfBirth, gender, occupation, entries: []
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: (uuid as () => string)(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (patientId: string, entry: Entry): PatientEntry => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }
  patient.entries.push(entry);
  return patient;
};

export default {
  getEntries,
  getPublicPatients,
  addPatient,
  addEntryToPatient
};