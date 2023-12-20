import patientsData from "../../data/patients"; // haetaan json-data
import {
  NewEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  Patient,
} from "../types";
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

const findById = (id: string): Patient | undefined => {
  const entry = patientsData.find((data) => data.id === id);
  return entry;
};

const addPatient = (body: NewPatientEntry) => {
  const newPatientEntry = {
    id: uuid(),
    ...body,
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (body: NewEntry, person: string) => {
  const newEntry = {
    id: uuid(),
    ...body,
  };
  const oldEntry = findById(person);
  if (oldEntry) {
    oldEntry.entries.push(newEntry);
    patientsData.concat(oldEntry);
    return newEntry;
  } else {
    throw new Error(
      `Incorrect or missing id! Could not find patient with id: ${person} in database`
    );
  }
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
