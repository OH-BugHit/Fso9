import { HeartBroken, MonitorHeart } from "@mui/icons-material";
import { Diagnosis, Entry, HealthCheckRating } from "../../types";

interface codeProps2 {
  code: string;
  codebase: Diagnosis[] | undefined;
}

// Haetaan name koodin mukaan
export const getCodeInfo = ({ code, codebase }: codeProps2) => {
  const f = codebase?.find((base) => base.code === code);
  if (f) return <>{f["name"]}</>;
};

interface codeProps {
  toRender: Entry;
  codebase: Diagnosis[] | undefined;
}

// Renderöidään koodit taulukosta entry.diagnosisCodes
export const codes = ({ toRender, codebase }: codeProps) => {
  if (toRender.diagnosisCodes) {
    return (
      <div>
        {toRender.diagnosisCodes.map((code: Diagnosis["code"]) => (
          <li key={code}>
            {code} {getCodeInfo({ code, codebase })}
          </li>
        ))}
      </div>
    );
  }
  return <p></p>;
};

export const showHealthCheckIcon = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <MonitorHeart sx={{ color: "green" }}></MonitorHeart>;
    case HealthCheckRating.LowRisk:
      return <MonitorHeart sx={{ color: "orange" }}></MonitorHeart>;
    case HealthCheckRating.HighRisk:
      return <MonitorHeart sx={{ color: "red" }}></MonitorHeart>;
    case HealthCheckRating.CriticalRisk:
      return <HeartBroken sx={{ color: "red" }}></HeartBroken>;
  }
};
