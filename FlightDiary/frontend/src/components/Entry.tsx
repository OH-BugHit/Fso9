import { NonSensitiveDiaryEntry } from "../types";

const Entry = ({ entry: entry }: { entry: NonSensitiveDiaryEntry }) => {
  return (
    <div className="entry">
      <p className="date">{entry.date}</p>
      <p className="details">visibility: {entry.visibility}</p>
      <p className="details">weather: {entry.weather}</p>
    </div>
  );
};

export default Entry;
