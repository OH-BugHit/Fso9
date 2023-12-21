import axios from "axios";
import { Entry, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";

interface createEntry {
  entry: NewEntry;
  patientID: string;
}

// Luodaan uusi kirjaus potilaalle
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
