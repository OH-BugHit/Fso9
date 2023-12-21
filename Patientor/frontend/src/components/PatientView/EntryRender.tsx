import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import hospitalEntry from "./TypeRenders/HospitalEntry";
import occupationalEntry from "./TypeRenders/OccupationalEntry";
import healthCheckEntry from "./TypeRenders/HealthCheckEntry";

interface EntryRenderProps {
  entry: Entry;
  codebase: Diagnosis[] | undefined;
}

const EntryRender = ({ entry, codebase }: EntryRenderProps) => {
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
