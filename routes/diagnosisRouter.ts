import express from 'express';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req, res) => {
  res.send('Fetching all diagnoses!');
});

export default diagnosisRouter;