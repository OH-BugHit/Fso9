import express from "express";
import patientsService from "../services/patientsService";
import { NewPatientEntry, NewEntry, Entry } from "../types";
import { toNewEntry, toNewPatient } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Sending all Patients");
  res.send(patientsService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  console.log(`Sending one patient, id: ${req.params.id}`);
  const patient = patientsService.findById(req.params.id);
  res.send(patient);
});

router.post("/", (req, res) => {
  console.log("adding new patient");
  try {
    const newPatient: NewPatientEntry = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong when adding new patient. ";
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  console.log("receaving new entry...");
  try {
    const newEntry: NewEntry = toNewEntry(req.body);
    const addedEntry: Entry = patientsService.addEntry(newEntry, req.params.id);
    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong when adding entry. ";
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
