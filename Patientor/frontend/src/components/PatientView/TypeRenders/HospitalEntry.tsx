import { LocalHospital } from "@mui/icons-material";
import { HospitalEntry, Diagnosis, Discharge } from "../../../types";
import { codes } from "../utils";

interface HospitalProps {
  toRender: HospitalEntry;
  codebase: Diagnosis[];
}

const discharge = (toRender: Discharge | undefined) => {
  if (toRender) {
    if (!toRender.date) {
      return null;
    }
    return (
      <div>
        <h4 style={{ marginBottom: "2px" }}>Discharged {toRender.date} </h4>
        <p className="description" style={{ marginBottom: "16px" }}>
          {toRender.criteria}
        </p>
      </div>
    );
  }
  return null;
};

const hospitalEntry = ({ toRender, codebase }: HospitalProps) => {
  return (
    <div>
      <h4>
        {toRender.date} {<LocalHospital sx={{ color: "Red" }}></LocalHospital>}
      </h4>
      <p className="description">{toRender.description}</p>
      <ul>{codes({ toRender, codebase })}</ul>
      <div>{discharge(toRender.discharge)}</div>
      <p>diagnose by {toRender.specialist}</p>
    </div>
  );
};

export default hospitalEntry;
