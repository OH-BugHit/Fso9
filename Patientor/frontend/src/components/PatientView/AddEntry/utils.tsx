import axios from "axios";
import { NewEntry, Entry } from "../../../types";
import entryService from "../../../services/entries";
import { ErrorOutline } from "@mui/icons-material";

interface submitProps {
  entry: NewEntry;
  entries: Entry[] | null;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  patientID: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line react-refresh/only-export-components
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

export const ErrorField = ({ error }: { error: string }) => {
  if (error === "") return null;
  return (
    <p className="error">
      <ErrorOutline sx={{ marginRight: "8px" }}></ErrorOutline>
      {error}
    </p>
  );
};
