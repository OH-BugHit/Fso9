import { NonSensitiveDiaryEntry } from "../../types";
import Entry from "./Entry";

const Entries = ({ entries }: { entries: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map((entry: NonSensitiveDiaryEntry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Entries;
