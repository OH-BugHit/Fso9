import axios from "axios";
import { Entry, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";

// Luodaan uusi potilas // LISSÄÄ TÄNNE PATIENID TULEMAAN PYYNNÖN MUKANA, SAADAAN id!
interface createEntry {
  entry: NewEntry;
  patientID: string;
}

const create = async ({ entry, patientID }: createEntry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientID}/entries`,
    entry
  );
  return data;
};

export default {
  create,
};
