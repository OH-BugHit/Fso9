import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { NewEntry, Visibility, newEntryProps } from "../../../../types";
import MultipleSelectChip, { ErrorField, submitNewEntry } from "../utils";

const AddNewOccupationalEntry = ({
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
  const [startDate, setStartDate] = useState<Date | string>(new Date());
  const [endDate, setEndDate] = useState<Date | string>(new Date());
  const [employerName, setEmployerName] = useState<string>("");
  const [isSickLeave, setIsSickLeave] = useState<boolean>(false);
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
    if (isSickLeave) {
      entry = {
        date: parseDate(date),
        specialist: specialist,
        description: description,
        type: "OccupationalHealthcare",
        diagnosisCodes: selectedDiagnosed,
        employerName: employerName,
        sickLeave: {
          startDate: parseDate(startDate),
          endDate: parseDate(endDate),
        },
      };
    } else {
      entry = {
        date: parseDate(date),
        specialist: specialist,
        description: description,
        type: "OccupationalHealthcare",
        diagnosisCodes: selectedDiagnosed,
        employerName: employerName,
      };
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
    setStartDate(new Date());
    setEndDate(new Date());
    setEmployerName("");
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

  const SickLeaveButton = () => {
    if (!isSickLeave) {
      return (
        <Button
          color="primary"
          variant="contained"
          type="button"
          onClick={useThis}
          sx={{
            float: "right",
            marginBottom: "16px",
            marginTop: "6px",
            minWidth: "fit-content",
          }}
        >
          Sick leave
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
            float: "right",
            marginBottom: "16px",
            marginTop: "6px",
            minWidth: "fit-content",
          }}
        >
          Cancel sick leave
        </Button>
      );
    }
  };

  const useThis = () => {
    setIsSickLeave(!isSickLeave);
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
              label="Employer name (required field)"
              type="text"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
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
                disabled={!isSickLeave}
                sx={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  minWidth: "auto",
                }}
                type="date"
                id="sickStartDate"
                label="First day of sick leave"
                defaultValue={parseDate(startDate)}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={({ target }) => setStartDate(target.value)}
              />
              <TextField
                disabled={!isSickLeave}
                sx={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  minWidth: "auto",
                }}
                type="date"
                id="sickEndDate"
                label="Last day of sick leave"
                defaultValue={parseDate(startDate)}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={({ target }) => setEndDate(target.value)}
              />
              <SickLeaveButton />
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

export default AddNewOccupationalEntry;
