import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
  EntryType,
  NewEntry,
  Visibility,
  newEntryProps,
} from "../../../../types";
import MultipleSelectChip, { ErrorField, submitNewEntry } from "../utils";

const AddNewHospitalEntry = ({
  show,
  setVisible,
  entries,
  setEntries,
  patientID,
  setButtonVis,
  codebase,
}: newEntryProps) => {
  const [error, setError] = useState<string>("");
  const [date, setDate] = useState<string | Date>(new Date());
  const [specialist, setSpecialist] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<EntryType | undefined>(undefined);
  const [dischargeDate, setDischargeDate] = useState<Date | string>(new Date());
  const [criteria, setCriteria] = useState<string>("");
  const [showDischarge, setShowDischarge] = useState<boolean>(false);
  const [selectedDiagnosed, setSelectedDiagnosed] = useState<string[]>([]);

  const onCancel = () => {
    setButtonVis(Visibility.visible);
    setVisible(false);
  };

  // Handleri Multiple selectoria varten (diagnoosien valinta)
  const handleSelectDiagnose = (
    event: SelectChangeEvent<typeof selectedDiagnosed>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedDiagnosed(typeof value === "string" ? value.split(",") : value);
  };

  // Kirjauksen koostaminen ja backendiin lähtys
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    setButtonVis(Visibility.visible);
    let entry: NewEntry;
    switch (type) {
      default: {
        if (showDischarge) {
          entry = {
            date: parseDate(date),
            specialist: specialist,
            description: description,
            type: "Hospital",
            diagnosisCodes: selectedDiagnosed,
            discharge: {
              date: parseDate(dischargeDate),
              criteria: criteria,
            },
          };
        } else {
          entry = {
            date: parseDate(date),
            specialist: specialist,
            description: description,
            type: "Hospital",
            diagnosisCodes: selectedDiagnosed,
          };
        }
      }
    }

    setError("");
    submitNewEntry({
      entry,
      entries,
      setEntries,
      setVisible,
      patientID,
      setError,
    });
    // Nollaillaan kaikki
    setDate(new Date());
    setSpecialist("");
    setSelectedDiagnosed([]);
    setDescription("");
    setType(undefined);
    setDischargeDate(new Date());
    setCriteria("");
  };

  const parseDate = (date: Date | string) => {
    if (typeof date === "string") {
      return date;
    }
    const newDate = date.toLocaleString();
    const taulukkoDate = newDate.split(".");
    const parsedDate =
      taulukkoDate[2].substring(0, 4) +
      "-" +
      taulukkoDate[1] +
      "-" +
      taulukkoDate[0];
    return parsedDate; // Ei nättiä mutta toimii...
  };

  const DischargeButton = () => {
    if (!showDischarge) {
      return (
        <Button
          color="primary"
          variant="contained"
          type="button"
          onClick={useThis}
          sx={{
            marginBottom: "16px",
            marginTop: "6px",
            minWidth: "fit-content",
          }}
        >
          Discharge
        </Button>
      );
    } else {
      return (
        <Button
          color="error"
          variant="contained"
          type="button"
          onClick={useThis}
          sx={{
            marginBottom: "16px",
            marginTop: "6px",
            minWidth: "fit-content",
          }}
        >
          Cancel Discharge
        </Button>
      );
    }
  };

  const useThis = () => {
    setShowDischarge(!showDischarge);
  };

  if (show)
    return (
      <div>
        <ErrorField error={error} />
        <div className="addEntryForm">
          <form onSubmit={addEntry}>
            <TextField
              sx={{ paddingTop: "8px", paddingBottom: "8px" }}
              type="date"
              fullWidth
              id="date"
              label="Date (required field)"
              defaultValue={parseDate(date)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              sx={{ paddingTop: "8px", paddingBottom: "8px" }}
              label="Description (required field)"
              placeholder="description of entry"
              type="text"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              sx={{ paddingTop: "8px", paddingBottom: "8px" }}
              label="Specialist (required field)"
              placeholder="MD..."
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <MultipleSelectChip
              diagnoses={codebase}
              handleSelectDiagnose={handleSelectDiagnose}
              selectedDiagnoses={selectedDiagnosed}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <TextField
                disabled={!showDischarge}
                sx={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  minWidth: "auto",
                }}
                type="date"
                id="date"
                label="Discharge"
                defaultValue={parseDate(dischargeDate)}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
              <TextField
                disabled={!showDischarge}
                sx={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
                fullWidth
                type="text"
                id="criteria"
                label="Criteria"
                placeholder="criteria for discharge"
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
              />
              <DischargeButton />
            </div>
            <Button
              color="error"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </form>
        </div>
      </div>
    );
  else return null;
};

export default AddNewHospitalEntry;
