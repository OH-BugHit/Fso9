import { NonSensitiveDiaryEntry } from "../../types";
import Entry from "./Entry";

const Entries = ({ entries }: { entries: NonSensitiveDiaryEntry[] }) => {
  return (
    <p>
      {entries.map((entry: NonSensitiveDiaryEntry) => (
        <Entry entry={entry} />
      ))}
    </p>
  );
};

export default Entries;
