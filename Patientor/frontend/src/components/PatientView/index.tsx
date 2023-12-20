import { useEffect, useState } from "react";
import patients from "../../services/patients";
import { Gender, Patient, Entry } from "../../types";
import EntryRender from "./EntryRender";
import { Button } from "@mui/material";
import AddNewEntry from "./AddNewEntry";

/**
 * Näyttää aluksi asiakkaan tiedot, jotka jo löytyvät. Hakee heti myös "tietokannasta" ajatasaisen tiedon ja päivittää kun haettu.
 * @param param0 Parametrinä potilaan tiedot
 * @returns palauttaa renderöintiä varten asiakkaan sivun
 */
const PatientView = ({ patient }: { patient: Patient | undefined }) => {
  const [ssn, setSsn] = useState<string>("");
  const [name, setName] = useState<string | undefined>(patient?.name);
  const [occupation, setOccupation] = useState<string | undefined>(
    patient?.occupation
  );
  const [gender, setGender] = useState<Gender | undefined>(patient?.gender);
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [addForm, setAddForm] = useState<boolean>(false);

  useEffect(() => {
    async function getSsn() {
      if (patient) {
        const patientData: Patient = await patients.getPatient(patient.id);
        if (patientData.ssn) {
          setSsn(patientData.ssn);
          setName(patientData.name);
          setOccupation(patient.occupation);
          setGender(patientData.gender);
          setEntries(patientData.entries);
        }
      }
    }
    if (patient !== undefined) {
      getSsn();
    }
  }, [patient]);
  if (patient === undefined) {
    return null;
  } else {
    const genderSymbol = (gender: string | undefined) => {
      switch (gender) {
        case "male": {
          return "♂";
        }
        case "female": {
          return "♀";
        }
        case "other": {
          return "⚤";
        }
        default:
          return null;
      }
    };

    const showForm = () => {
      setAddForm(true);
    };

    return (
      <div>
        <h2>{`${name} ${genderSymbol(gender)}`}</h2>
        <p>ssn: {ssn}</p>
        <p>occupation: {occupation}</p>
        <AddNewEntry
          show={addForm}
          setVisible={setAddForm}
          entries={entries}
          setEntries={setEntries}
          patientID={patient.id}
        ></AddNewEntry>
        <h3>entries</h3>
        <div>
          {entries?.map((entry: Entry) => (
            <EntryRender key={entry.id} entry={entry} />
          ))}
        </div>
        <Button variant="contained" onClick={() => showForm()}>
          Add new entry
        </Button>
      </div>
    );
  }
};

export default PatientView;
