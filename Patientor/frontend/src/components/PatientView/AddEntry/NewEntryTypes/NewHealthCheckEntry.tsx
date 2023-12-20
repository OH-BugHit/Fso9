import { Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
  Diagnosis,
  HealthCheckRating,
  NewEntry,
  Visibility,
  newEntryProps,
} from "../../../../types";
import { ErrorField, submitNewEntry } from "../utils";
import HealthRatingBar from "../../../HealthRatingBar";

const AddNewHealthCheckEntry = ({
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
  const [heathCheckRating, setHeathCheckRating] =
    useState<HealthCheckRating | null>(HealthCheckRating.Healthy);

  const onCancel = () => {
    setButtonVis(Visibility.visible);
    setVisible(false);
  };

  // Itse ehkä olisin numeroinut alunperin eritavalla nämä, mutta "tietokannassa" jo näin niin tehdään tällainen käännös
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

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (heathCheckRating) {
      const saveHealthRate = invertHealth(heathCheckRating);
      console.log(saveHealthRate);

      const entry: NewEntry = {
        date: parseDate(date),
        specialist: specialist,
        description: description,
        type: "HealthCheck",
        diagnosisCodes: diagnosisCodes,
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
      if (error === "") {
        setButtonVis(Visibility.visible);
      }
      // Nollaillaan kaikki
      setDate(new Date());
      setSpecialist("");
      setDiagnosisCodes([]);
      setDescription("");
      setHeathCheckRating(null);
    } else {
      setError(
        "Missing health check rating! Please provide it by clicking suitable start/heart"
      );
    }
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
            <TextField
              sx={{ paddingTop: "8px", paddingBottom: "8px" }}
              label="Diagnosis codes"
              placeholder="Z57.1, N30.0"
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => parseDiagnosis(target.value)}
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
