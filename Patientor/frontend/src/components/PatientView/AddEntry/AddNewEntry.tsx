import AddNewHospitalEntry from "./NewEntryTypes/NewHospitalEntry";
import { Entry } from "../../../types";

interface newEntryProps {
  show: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  entries: Entry[] | null;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
  patientID: string;
}
const AddNewEntry = ({
  show,
  setVisible,
  entries,
  setEntries,
  patientID,
}: newEntryProps) => {
  return (
    <div>
      <AddNewHospitalEntry
        show={show}
        setVisible={setVisible}
        entries={entries}
        setEntries={setEntries}
        patientID={patientID}
      ></AddNewHospitalEntry>
    </div>
  );
};

export default AddNewEntry;
