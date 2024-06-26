/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

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

export default patientsRouter;