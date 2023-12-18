import { useEffect, useState } from "react";
import patients from "../../services/patients";
import { Gender, Patient, Entry } from "../../types";
import EntryRender from "./EntryRender";

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
    const genderSymbol = () => {
      switch (gender) {
        case Gender.Male: {
          return "♂";
        }
        case Gender.Female: {
          return "♀";
        }
        case Gender.Other: {
          return "⚤";
        }
      }
    };

    return (
      <div>
        <h2>{`${name} ${genderSymbol()}`}</h2>
        <p>ssn: {ssn}</p>
        <p>occupation: {occupation}</p>
        <h3>entries</h3>
        <p>
          {entries?.map((entry: Entry) => (
            <EntryRender entry={entry} />
          ))}
        </p>
      </div>
    );
  }
};

export default PatientView;

/*
{props.map((course: CoursePart) => (
        <Part props={course} />
      ))}
      */
