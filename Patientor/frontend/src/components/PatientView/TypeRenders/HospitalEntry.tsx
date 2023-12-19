import { LocalHospital } from "@mui/icons-material";
import { HospitalEntry, Diagnosis, Discharge } from "../../../types";
import { codes } from "../utils";

interface HospitalProps {
  toRender: HospitalEntry;
  codebase: Diagnosis[];
}

const discharge = (toRender: Discharge | undefined) => {
  if (toRender) {
    return (
      <div>
        <h4>Discharged {toRender.date} </h4>
        <p className="description">{toRender.criteria}</p>
      </div>
    );
  }
  return null;
};

const hospitalEntry = ({ toRender, codebase }: HospitalProps) => {
  //Pohja kaikkiin renderöinteihin
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
