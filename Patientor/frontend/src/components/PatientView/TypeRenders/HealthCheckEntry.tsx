import { codes, showHealthCheckIcon } from "../utils";
import { HealthCheckEntry, Diagnosis } from "../../../types";
import { MoreTime } from "@mui/icons-material";

interface HealthCheckProps {
  toRender: HealthCheckEntry;
  codebase: Diagnosis[];
}

const healthCheckEntry = ({ toRender, codebase }: HealthCheckProps) => {
  return (
    <div>
      <h4>
        {toRender.date} <MoreTime sx={{ color: "green" }}></MoreTime>
      </h4>
      <p className="description">{toRender.description}</p>
      <p>{showHealthCheckIcon(toRender.healthCheckRating)}</p>
      <ul>{codes({ toRender, codebase })}</ul>
      <p>diagnose by {toRender.specialist}</p>
    </div>
  );
};

export default healthCheckEntry;
