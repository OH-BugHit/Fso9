import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../types";
import patients from "../../services/patients";
import { codes } from "./utils";

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

  if (entry) {
    const base = () => {
      //Pohja kaikkiin renderöinteihin
      return (
        <div>
          <p>{`${entry.date} ${entry.description}`}</p>

          <ul>{codes({ entry, codebase })}</ul>
        </div>
      );
    };
    // Erityyppisten entryjen näyttämiseen eri palautukset
    switch (entry.type) {
      case "Hospital":
        return <div>{base()}</div>;
      case "HealthCheck":
        return <div>{base()}</div>;
      case "OccupationalHealthcare":
        return <div>{base()}</div>;
    }
    return <p>{entry.date}</p>;
  } else {
    return null;
  }
};

export default EntryRender;
