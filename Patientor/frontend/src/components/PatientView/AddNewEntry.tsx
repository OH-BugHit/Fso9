/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TextField,
  Grid,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Input,
} from "@mui/material";
import { useState } from "react";
import {
  Diagnosis,
  Discharge,
  EntryType,
  HealthCheckRating,
  SickLeave,
} from "../../types";

const addPatient = () => {
  null;
};

interface newEntryProps {
  show: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewEntry = ({ show, setVisible }: newEntryProps) => {
  const [date, setDate] = useState<string | Date>(new Date());
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[] | null>(
    null
  );
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<EntryType | null>(null);
  const [discharge, setDischarge] = useState<Discharge | null>(null);
  const [heathCheckRating, setHeathCheckRating] =
    useState<HealthCheckRating | null>(null);
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<SickLeave | null>(null);

  const onCancel = () => {
    setVisible(false);
  };

  if (show)
    return (
      <div className="addEntryForm">
        <form onSubmit={addPatient}>
          <TextField
            type="date"
            id="date"
            label="Date"
            defaultValue={date}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Description"
            placeholder="..."
            type="text"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </form>
      </div>
    );
  else return null;
};

export default AddNewEntry;
