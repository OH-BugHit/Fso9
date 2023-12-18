import { Diagnosis, Entry } from "../../types";

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
  entry: Entry;
  codebase: Diagnosis[] | undefined;
}

// Renderöidään koodit taulukosta entry.diagnosisCodes
export const codes = ({ entry, codebase }: codeProps) => {
  if (entry.diagnosisCodes) {
    return (
      <div>
        {entry.diagnosisCodes.map((code: Diagnosis["code"]) => (
          <li key={code}>
            {code} {getCodeInfo({ code, codebase })}
          </li>
        ))}
      </div>
    );
  }
  return <p></p>;
};
