import { Gender, NewPatientEntry } from "./types/types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing field: ' + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: NewPatientEntry): NewPatientEntry => {
  return {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
    };
};

import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthEntry, HealthCheckRating } from './types/types';

// Type guards for each entry type
const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
    return entry.type === 'HealthCheck';
};

const isHospitalEntry = (entry: Entry): entry is HospitalEntry => {
    return entry.type === 'Hospital';
};

const isOccupationalHealthcareEntry = (entry: Entry): entry is OccupationalHealthEntry => {
    return entry.type === 'OccupationalHealth';
};

// Common field parsers
const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

// const parseDate = (date: unknown): string => {
//     if (!date || !isString(date) || !isDate(date)) {
//         throw new Error('Incorrect or missing date: ' + date);
//     }
//     return date;
// };

// Type guard for HealthCheckRating
const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating as HealthCheckRating);
};

// Type-specific field parsers
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (rating === null || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};

// Main function to validate and convert the request body to a proper Entry type
export const toNewEntry = (entry: Entry): Entry => {
    if (isHealthCheckEntry(entry)) {
      // Ensure entry.healthCheckRating is not null or an empty object before passing
      if (entry.healthCheckRating === null || (typeof entry.healthCheckRating === 'object' && Object.keys(entry.healthCheckRating).length === 0)) {
        throw new Error('Health check rating cannot be null or an empty object');
    }
        return {
            ...entry,
            description: parseDescription(entry.description),
            date: parseDate(entry.date),
            healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
        };
    } else if (isHospitalEntry(entry)) {
        // Add parsing logic for HospitalEntry specific fields
        return {
            ...entry,
            description: parseDescription(entry.description),
            date: parseDate(entry.date),
            // Assume discharge is a field in HospitalEntry and has its own parsing/validation function
            // discharge: parseDischarge(entry.discharge)
        };
    } else if (isOccupationalHealthcareEntry(entry)) {
        // Add parsing logic for OccupationalHealthcareEntry specific fields
        return {
            ...entry,
            description: parseDescription(entry.description),
            date: parseDate(entry.date),
            // Assume employerName is a field in OccupationalHealthcareEntry and has its own parsing/validation function
            employerName: parseString(entry.employerName)
        };
    } else {
        throw new Error('Incorrect or missing type');
    }
};



export default toNewPatientEntry;