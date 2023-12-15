import diagnosesData from "../../data/diagnoses"; // haetaan json-data
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses,
};
