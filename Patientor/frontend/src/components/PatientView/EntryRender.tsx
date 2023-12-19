import { useEffect, useState } from "react";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import patients from "../../services/patients";
import hospitalEntry from "./TypeRenders/HospitalEntry";
import occupationalEntry from "./TypeRenders/OccupationalEntry";
import healthCheckEntry from "./TypeRenders/HealthCheckEntry";

const EntryRender = ({ entry }: { entry: Entry }) => {
  const [codebase, setCodebase] = useState<Diagnosis[] | undefined>(undefined); //codebase on siis diagnostiikkakoodiolio joka sisältää myös eng ja latin tekstit
  useEffect(() => {
    //se haetaan backendistä useEffectillä
    async function getDiagnoses() {
      const codes: Diagnosis[] = await patients.getDiagnoses();
      if (codes) {
        setCodebase(codes); // Ja asetellaan normaalisti useStateen
      }
    }
    if (codebase === undefined) {
      getDiagnoses(); // Ja koska async niin näin eikä suoraan
    }
  }, [codebase]);

  if (entry && codebase) {
    // Erityyppisten entryjen näyttämiseen eri palautukset
    let toRender;
    switch (entry.type) {
      case "Hospital":
        toRender = entry as HospitalEntry;
        return (
          <div className="entry">{hospitalEntry({ toRender, codebase })}</div>
        );
      case "HealthCheck":
        toRender = entry as HealthCheckEntry;
        return (
          <div className="entry">
            {healthCheckEntry({ toRender, codebase })}
          </div>
        );
      case "OccupationalHealthcare":
        toRender = entry as OccupationalHealthcareEntry;
        return (
          <div className="entry">
            {occupationalEntry({ toRender, codebase })}
          </div>
        );
    }
    return <p>{entry.date}</p>;
  } else {
    return null;
  }
};

export default EntryRender;
