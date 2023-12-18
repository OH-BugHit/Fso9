import { Diagnosis, Entry } from "../../types";

const codes = ({ entry }: { entry: Entry }) => {
  if (entry.diagnosisCodes) {
    return (
      <div>
        {entry.diagnosisCodes.map((code: Diagnosis["code"]) => (
          <li key={code}>{code}</li>
        ))}
      </div>
    );
  }
  return <p></p>;
};

const EntryRender = ({ entry }: { entry: Entry }) => {
  if (entry) {
    const base = () => {
      return (
        <div>
          <p>{`${entry.date} ${entry.description}`}</p>

          <ul>{codes({ entry })}</ul>
        </div>
      );
    };

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

/*

{entries?.map((entry: Entry) => (
            <EntryRender key={entry.id} entry={entry} />
          ))}
          */
