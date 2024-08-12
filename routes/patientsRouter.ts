/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
import { toNewEntry } from '../utils';
import { Entry, HealthCheckRating } from '../types/types';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getPublicPatients());
});

patientsRouter.get('/:id', (req, res) => {
  const patient = patientsService.getEntries().find(p => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientsRouter.post('/', (req, res) => {
  console.log(req.body);
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Something went wrong');
    }
  }
});

function describeEntry(entry: Entry): string {
  switch (entry.type) {
      case 'Hospital':
          return `Hospital Entry: Discharged on ${entry.discharge.date}`;
      case 'OccupationalHealth':
          return `Occupational Health Entry: Employer - ${entry.employerName}`;
      case 'HealthCheck':
          const ratingDescription = Object.keys(HealthCheckRating)[entry.healthCheckRating];
          return `Health Check Entry: Rating - ${ratingDescription}`;
      default:
          return 'Unknown Entry Type';
  }
}

patientsRouter.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  try {
    describeEntry(req.body);
    // Validate the entry data and convert it to a NewEntry type
    const newEntry: Entry = toNewEntry(req.body);
    
    // Attempt to add the entry to the patient
    const updatedPatient = patientsService.addEntryToPatient(patientId, newEntry);
    
    // If the patient is not found or the entry cannot be added, throw an error
    if (!updatedPatient) {
      res.status(404).send({ error: 'Patient not found' });
    } else {
      // If successful, return the updated patient
      res.json(updatedPatient);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      // Handle known errors, such as validation errors
      res.status(400).send(e.message);
    } else {
      // Handle unexpected errors
      res.status(500).send('Something went wrong');
    }
  }
});


export default patientsRouter;