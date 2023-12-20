import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatientEntry,
  SickLeave,
} from "./types";

// Tuleva objekti on unknown, lähtevä on varmistettu newPatientEntry eli Patient ilman id, id lisätään servicesissä ennen lisäystä json (tai tietokanta lisäisi jos olisi)
export const toNewPatient = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseString("name", object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString("ssn", object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString("occupation", object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("type" in object) {
    if (!("date"! in object)) {
      throw new Error("Missing date");
    }
    if (!("specialist" in object)) {
      throw new Error("Missing specialist");
    }
    if (!("description" in object)) {
      throw new Error("Missing description");
    }
    switch (object.type) {
      case "Hospital": {
        const newEntry: NewEntry = {
          type: "Hospital",
          date: parseDate(object.date),
          description: parseString("description", object.description),
          specialist: parseString("specialist", object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          discharge: parseDischarge(object),
        };
        return newEntry;
      }
      case "OccupationalHealthcare": {
        if ("employerName" in object) {
          const newEntry: NewEntry = {
            type: "OccupationalHealthcare",
            date: parseDate(object.date),
            description: parseString("description", object.description),
            specialist: parseString("specialist", object.specialist),
            employerName: parseString("employername", object.employerName),
            diagnosisCodes: parseDiagnosisCodes(object),
            sickLeave: parseSickLeave(object),
          };
          return newEntry;
        } else {
          throw new Error(
            "Incorrect OccupationalHealthcareEntry. Missing employerName?"
          );
        }
      }
      case "HealthCheck": {
        if ("healthCheckRating" in object) {
          const newEntry: NewEntry = {
            type: "OccupationalHealthcare",
            date: parseDate(object.date),
            description: parseString("description", object.description),
            specialist: parseString("specialist", object.specialist),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object),
          };
          return newEntry;
        } else {
          throw new Error(
            "Incorrect HealthCheckEntry. Missing healthCheckRating?"
          );
        }
      }
    }
    console.log(object.type);
  }
  throw new Error(`Missing or invalid type of entry!`);
};

const parseHealthCheckRating = (param: unknown) => {
  if (!isNumber(param) || !isHealthCheckRating(param)) {
    throw new Error(
      `Incorrect or missing value. ${param} is not type of HeathCheckRating`
    );
  }
  return param;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.toString())
    .includes(param.toString());
};

const parseString = (key: string, param: unknown): string => {
  if (!isString(param) || param.length === 0) {
    throw new Error(
      `Incorrect or missing value "${key}". Value given: "${param}"`
    );
  }
  return param;
};

// type guard, compiler knows that the type of param is string if true
const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const parseGender = (param: unknown) => {
  if (!isString(param) || !isGender(param)) {
    throw new Error(`Incorrect or missing gender: ${param}`);
  }
  return param;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object" || !("sickLeave" in object)) {
    // we will just trust the data to be in correct form
    return {} as SickLeave;
  }
  return object.sickLeave as SickLeave;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    return {} as Discharge;
  }
  return object.discharge as Discharge;
};
