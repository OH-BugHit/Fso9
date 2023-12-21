import AddNewHospitalEntry from "./NewEntryTypes/NewHospitalEntry";
import { Diagnosis, Entry, Visibility } from "../../../types";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddNewOccupationalEntry from "./NewEntryTypes/NewOccupationalHC_Entry";
import AddNewHealthCheckEntry from "./NewEntryTypes/NewHealthCheckEntry";

interface addNewEntryProps {
  show: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  entries: Entry[] | null;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
  patientID: string;
  codebase: Diagnosis[];
}

// Uuden kirjauksen lisääminen
const AddNewEntry = ({
  show,
  setVisible,
  entries,
  setEntries,
  patientID,
  codebase,
}: addNewEntryProps) => {
  const [form, setForm] = useState<string>("");
  const [buttonVis, setButtonVis] = useState<Visibility>(Visibility.visible);
  useEffect(() => {
    setForm("");
  }, [show]);

  // Formin valinnan handleri
  const pickForm = (form: string) => {
    setButtonVis(Visibility.collapse);
    setForm(form);
  };

  // Kirjauksen tyypin mukaan esittäminen
  const showEntryForm = () => {
    switch (form) {
      case "Hospital": {
        return (
          <div>
            <h2>New Hospital Entry</h2>
            <AddNewHospitalEntry
              show={show}
              setVisible={setVisible}
              entries={entries}
              setEntries={setEntries}
              patientID={patientID}
              setButtonVis={setButtonVis}
              codebase={codebase}
            ></AddNewHospitalEntry>
          </div>
        );
      }
      case "Occupational": {
        return (
          <div>
            <h2>New Occupational Entry</h2>
            <AddNewOccupationalEntry
              show={show}
              setVisible={setVisible}
              entries={entries}
              setEntries={setEntries}
              patientID={patientID}
              setButtonVis={setButtonVis}
              codebase={codebase}
            ></AddNewOccupationalEntry>
          </div>
        );
      }
      case "HealthCheck": {
        return (
          <div>
            <h2>New Health Check Entry</h2>
            <AddNewHealthCheckEntry
              show={show}
              setVisible={setVisible}
              entries={entries}
              setEntries={setEntries}
              patientID={patientID}
              setButtonVis={setButtonVis}
              codebase={codebase}
            ></AddNewHealthCheckEntry>
          </div>
        );
      }
      default:
        return null;
    }
  };

  if (show) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            margin: "10px",
            visibility: buttonVis,
          }}
        >
          <Button
            sx={{ margin: "2px" }}
            variant="contained"
            onClick={() => pickForm("Hospital")}
          >
            New Hospital entry
          </Button>
          <Button
            sx={{ margin: "2px" }}
            variant="contained"
            onClick={() => pickForm("Occupational")}
          >
            New Occupational entry
          </Button>
          <Button
            sx={{ margin: "2px" }}
            variant="contained"
            onClick={() => pickForm("HealthCheck")}
          >
            New Health Check entry
          </Button>
        </div>
        {showEntryForm()}
      </div>
    );
  }
  return null;
};

export default AddNewEntry;
