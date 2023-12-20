import { Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
  Diagnosis,
  EntryType,
  NewEntry,
  Visibility,
  newEntryProps,
} from "../../../../types";
import { ErrorField, submitNewEntry } from "../utils";

const AddNewHospitalEntry = ({
  show,
  setVisible,
  entries,
  setEntries,
  patientID,
  setButtonVis,
}: newEntryProps) => {
  const [error, setError] = useState<string>("");
  const [date, setDate] = useState<string | Date>(new Date());
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<EntryType | undefined>(undefined);
  const [dischargeDate, setDischargeDate] = useState<Date | string>(new Date());
  const [criteria, setCriteria] = useState<string>("");
  const [showDischarge, setShowDischarge] = useState<boolean>(false);

  const onCancel = () => {
    setButtonVis(Visibility.visible);
    setVisible(false);
  };

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
            diagnosisCodes: diagnosisCodes,
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
            diagnosisCodes: diagnosisCodes,
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
    setDiagnosisCodes([]);
    setDescription("");
    setType(undefined);
    setDischargeDate(new Date());
    setCriteria("");
  };

  const parseDiagnosis = (data: string) => {
    let parsed = data.split(","); // Katkotaan arrayksi
    parsed = parsed.map((a) => a.trim()); //Poistetaan välilyönti
    setDiagnosisCodes(parsed); // Asetetaan
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
            <TextField
              sx={{ paddingTop: "8px", paddingBottom: "8px" }}
              label="Diagnosis codes"
              placeholder="Z57.1, N30.0"
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => parseDiagnosis(target.value)}
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