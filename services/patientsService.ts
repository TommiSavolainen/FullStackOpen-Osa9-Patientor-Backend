import patientsData from '../data/patients';
import { PatientEntry, PublicPatient, NewPatientEntry } from '../types/types';
import { v1 as uuid } from 'uuid';

const patients: PatientEntry[] = patientsData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation } ) => ({
    id, name, dateOfBirth, gender, occupation
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

export default {
  getEntries,
  getPublicPatients,
  addPatient
};