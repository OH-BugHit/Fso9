import { CoursePartBase } from "../types";

/**
 *
 * @param props Kurssiin liittyvät osiot
 * @returns Palauttaa montako tuntia menee yhteensä osioissa
 */
const totalExercises = (props: CoursePartBase[]) => {
  return props.reduce((sum, part) => sum + part.exerciseCount, 0);
};

/**
 *
 * @param param0 Ottaa kurssin sisällön
 * @returns Palauttaa "Number of exercises {kokonaismäärä}"
 */
const Total = ({ props }: { props: CoursePartBase[] }) => {
  return <p>Number of exercises {totalExercises(props)}</p>;
};

export default Total;
