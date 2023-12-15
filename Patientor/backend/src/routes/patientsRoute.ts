/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import patientsService from "../services/patientsService";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Sending all Patients");
  res.send(patientsService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  console.log("adding new patient");
  const addedPatient = patientsService.addPatient(req.body);
  res.status(201).json(addedPatient);
});

export default router;
