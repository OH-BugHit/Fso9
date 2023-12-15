import patientsData from "../../data/patients"; // haetaan json-data
import { NonSensitivePatientEntry, Patient } from "../types";
import { v1 as uuid } from "uuid";
const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (body: Patient) => {
  body.id = uuid();
  patientsData.push(body);
  return body;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
