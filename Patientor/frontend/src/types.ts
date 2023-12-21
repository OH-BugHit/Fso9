// Diagnoosin tyypit
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

//Sukupuolet
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// Potilaan tyypit
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: [];
}

// Uuden entryn tyypit
export type NewEntry = UnionOmit<Entry, "id">;

// Sairasloman tyypit
export interface SickLeave {
  startDate: string;
  endDate: string;
}

// Kirjauksen yhteiset tyypit
export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  description: string;
  type: string;
}

// Eri kirjauksien tyypit
export enum EntryType {
  Hospital = "Hospital",
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
}

// Komponentin näkyvyys
export const enum Visibility {
  visible = "visible",
  hidden = "hidden",
  collapse = "collapse",
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

// Sairaalan kirjauksen tyypit
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

// Terveystarkastuksen tyypit
export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}

// Uuden kirjauksen tyypit
export interface newEntryProps {
  show: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  entries: Entry[] | null;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
  patientID: string;
  setButtonVis: React.Dispatch<React.SetStateAction<Visibility>>;
  codebase: Diagnosis[];
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

// For "new patient"-form
export type PatientFormValues = Omit<Patient, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
