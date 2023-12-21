import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
  HealthCheckRating,
  NewEntry,
  Visibility,
  newEntryProps,
} from "../../../../types";
import MultipleSelectChip, { ErrorField, submitNewEntry } from "../utils";
import HealthRatingBar from "../../../HealthRatingBar";

const AddNewHealthCheckEntry = ({
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
  const [heathCheckRating, setHeathCheckRating] =
    useState<HealthCheckRating | null>(HealthCheckRating.Healthy);
  const [selectedDiagnosed, setSelectedDiagnosed] = useState<string[]>([]);

  const onCancel = () => {
    setButtonVis(Visibility.visible);
    setVisible(false);
  };

  // Itse ehkä olisin numeroinut alunperin eritavalla nämä, mutta "tietokannassa" jo näin niin tehdään tietenkin tällainen käännös
  const invertHealth = (num: HealthCheckRating): HealthCheckRating => {
    const oikeaNum = (num as number) - 1;
    switch (oikeaNum as HealthCheckRating) {
      case HealthCheckRating.Healthy:
        return HealthCheckRating.CriticalRisk;
      case HealthCheckRating.LowRisk:
        return HealthCheckRating.HighRisk;
      case HealthCheckRating.HighRisk:
        return HealthCheckRating.LowRisk;
      case HealthCheckRating.CriticalRisk:
        return HealthCheckRating.Healthy;
    }
  };

  // Kirjauksen koostaminen ja backendiin lähtys
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (heathCheckRating) {
      const saveHealthRate = invertHealth(heathCheckRating); // Käännetään rating-arvosta healthCheck ratingiin
      const entry: NewEntry = {
        date: parseDate(date),
        specialist: specialist,
        description: description,
        type: "HealthCheck",
        diagnosisCodes: selectedDiagnosed,
        healthCheckRating: saveHealthRate,
      };

      setError("");
      submitNewEntry({
        entry,
        entries,
        setEntries,
        setVisible,
        patientID,
        setError,
      });
      setButtonVis(Visibility.visible);
      // Nollaillaan kaikki
      setDate(new Date());
      setSpecialist("");
      setSelectedDiagnosed([]);
      setDescription("");
      setHeathCheckRating(null);
    } else {
      setError(
        "Missing health check rating! Please provide it by clicking suitable start/heart"
      );
    }
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

  const handleHealthRatingBar = (
    _event: SyntheticEvent,
    newValue: number | null
  ) => {
    setHeathCheckRating(newValue as HealthCheckRating);
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
            <div
              style={{
                border: "solid 1px",
                borderRadius: "8px",
                padding: "8px",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            >
              <p className="hcR">Health check rating</p>
              <HealthRatingBar
                rating={heathCheckRating}
                showText={true}
                readOnly={false}
                handleChange={handleHealthRatingBar}
              />
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

export default AddNewHealthCheckEntry;
