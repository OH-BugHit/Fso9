import axios from "axios";
import { Diagnosis, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

// Haetaan kaikki potilaat
const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

// Haetaan tietyn potilaan tiedot
const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

// Luodaan uusi potilas
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

// Haetaan diagnoosilista (jossa siis koodi, name ja latin?)
const getDiagnoses = async () => {
  console.log("retrieving diagnosis...");
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

export default {
  getAll,
  create,
  getPatient,
  getDiagnoses,
};
