import { codes } from "../utils";
import {
  OccupationalHealthcareEntry,
  Diagnosis,
  SickLeave,
} from "../../../types";
import { Work } from "@mui/icons-material";

interface OccupationalHealthcareProps {
  toRender: OccupationalHealthcareEntry;
  codebase: Diagnosis[];
}

const parseDateToDays = (date: string): Date => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const dayCalculator = (date1: string, date2: string): number => {
  const days1 = parseDateToDays(date1);
  const days2 = parseDateToDays(date2);
  const diff = Math.abs(days2.getTime() - days1.getTime());
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days;
};

const sickLeave = (toRender: SickLeave | undefined) => {
  if (toRender) {
    const days = dayCalculator(toRender.startDate, toRender.endDate);
    return (
      <div>
        <h4>
          Sickleave for {days} days
          <p className="description">
            from: {toRender.startDate} <br />
            to: {toRender.endDate}{" "}
          </p>
        </h4>
      </div>
    );
  }
  return null;
};

const occupationalEntry = ({
  toRender,
  codebase,
}: OccupationalHealthcareProps) => {
  return (
    <div>
      <h4>
        {toRender.date} {<Work sx={{ color: "brown" }}></Work>}{" "}
        {toRender.employerName}
      </h4>
      <p className="description">{toRender.description}</p>
      <ul>{codes({ toRender, codebase })}</ul>
      <p>{sickLeave(toRender.sickLeave)}</p>
      <p>diagnose by {toRender.specialist}</p>
    </div>
  );
};

export default occupationalEntry;
