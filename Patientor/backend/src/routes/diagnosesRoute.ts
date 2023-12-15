import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Sending all diagnosis");
  res.send(diagnosesService.getEntries());
});

export default router;
