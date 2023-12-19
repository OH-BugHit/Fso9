export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum EntryType {
  Hospital = "Hospital",
  HealthCheck = "HeathCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  description: string;
  type: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  discharge?: Discharge;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheck extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, "id">;

export type Entry = HealthCheck | HospitalEntry | OccupationalHealthcareEntry;

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;
