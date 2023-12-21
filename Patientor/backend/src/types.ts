//Diagnoosia vastaava tyypitys
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

//Potilasta vastaava tyypitys
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

//Sukupuolivalintaa vastaava tyypitys
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

//Eri kirjaustyypit
export enum EntryType {
  Hospital = "Hospital",
  HealthCheck = "HeathCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
}

// Sairaspoissaolojen tyypitys
export interface SickLeave {
  startDate: string;
  endDate: string;
}

// Kirjauksen pohja tyypit (yhteiset)
export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  description: string;
  type: string;
}

// TyöTH-kirjauksen tyypit
export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: SickLeave;
}

// Kotiutuksen tyypit
export interface Discharge {
  date: string;
  criteria: string;
}

// Sairaalakirjauksen tyypit
export interface HospitalEntry extends BaseEntry {
  discharge?: Discharge;
}

// Terveysluokituksen tyypit
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

// Terveystarkastuksen kirjauksen tyypit
export interface HealthCheck extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}

// Union emitti, eli poistetaan annetun avaimen (yhdisteen) kaikista joukoista value
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, "id">;

export type Entry = HealthCheck | HospitalEntry | OccupationalHealthcareEntry;

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;
