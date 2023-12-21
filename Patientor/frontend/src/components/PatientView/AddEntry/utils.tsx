import axios from "axios";
import { NewEntry, Entry, Diagnosis } from "../../../types";
import entryService from "../../../services/entries";
import { ErrorOutline } from "@mui/icons-material";
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
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

export default function MultipleSelectChip({
  diagnoses,
}: {
  diagnoses: Diagnosis["code"][];
}) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Diagnosis codes</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {diagnoses.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
