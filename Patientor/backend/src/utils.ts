import { Gender, NewPatientEntry } from "./types";

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
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseString = (key: string, param: unknown): string => {
  if (!isString(param) || param.length === 0) {
    throw new Error(`Incorrect or missing value ${key} with input ${param}`);
  }
  return param;
};

// type guard, compiler knows that the type of param is string if true
const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
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

/*
  id: string;
  name: string;
  dateOfBirth: Date;
  ssn: string;
  gender: string;
  occupation: string;
  */
