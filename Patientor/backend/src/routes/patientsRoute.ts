import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Sending all Patients");
  res.send(patientsService.getNonSensitiveEntries());
});

export default router;
