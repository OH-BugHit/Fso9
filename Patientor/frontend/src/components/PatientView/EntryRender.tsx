import { Entry } from "../../types";

const EntryRender = ({ entry }: { entry: Entry }) => {
  if (entry) {
    return <p>{entry.date}</p>;
  } else {
    return null;
  }
};

export default EntryRender;
