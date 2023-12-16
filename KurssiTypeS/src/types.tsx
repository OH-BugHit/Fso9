/**
 * Otsikon propsit
 */
export interface HeaderProps {
  name: string;
}

/**
 * Kurssin propsit
 */
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourcePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourcePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CourcePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CourcePartDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
