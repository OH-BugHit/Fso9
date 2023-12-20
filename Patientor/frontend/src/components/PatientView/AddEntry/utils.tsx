import axios from "axios";
import { NewEntry, Entry } from "../../../types";
import entryService from "../../../services/entries";

interface submitProps {
  entry: NewEntry;
  entries: Entry[] | null;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  patientID: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const submitNewEntry = async ({
  entry,
  entries,
  setEntries,
  setVisible,
  patientID,
  setError,
}: submitProps) => {
  try {
    const addedEntry = await entryService.create({ entry, patientID });
    if (entries !== null) {
      setEntries(entries.concat(addedEntry));
    } else {
      setEntries([addedEntry]);
    }
    setVisible(false);
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === "string") {
        const message = e.response.data.replace(
          "Something went wrong. Error: ",
          ""
        );
        setError(message);
        console.error(message);
      }
    } else {
      console.error("Unknown error", e);
    }
  }
};
