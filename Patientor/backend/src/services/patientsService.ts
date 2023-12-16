import patientsData from "../../data/patients"; // haetaan json-data
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
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

const addPatient = (body: NewPatientEntry) => {
  const newPatientEntry = {
    id: uuid(),
    ...body,
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
