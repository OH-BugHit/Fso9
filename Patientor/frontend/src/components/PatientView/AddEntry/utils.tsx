import axios from "axios";
import { NewEntry, Entry, Diagnosis } from "../../../types";
import entryService from "../../../services/entries";
import { ErrorOutline } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface submitProps {
  entry: NewEntry;
  entries: Entry[] | null;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  patientID: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

// Ainut eslint ohitus, tää käy näin minulle
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ChipInterface {
  diagnoses: Diagnosis[];
  handleSelectDiagnose: (event: SelectChangeEvent<string[]>) => void;
  selectedDiagnoses: string[];
}

// Multiple select komponentti, handleri tulee propsina.
export default function MultipleSelectChip({
  diagnoses,
  handleSelectDiagnose,
  selectedDiagnoses,
}: ChipInterface) {
  return (
    <div>
      <FormControl fullWidth sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
        <InputLabel id="multiple-chip-label">Diagnosis codes</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={selectedDiagnoses}
          onChange={handleSelectDiagnose}
          input={
            <OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />
          }
          renderValue={(selectedDiagnoses) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedDiagnoses.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnose) => (
            <MenuItem key={diagnose["code"]} value={diagnose["code"]}>
              {diagnose["code"]} {diagnose["name"]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
