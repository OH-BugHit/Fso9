import { CoursePart } from "../types";
import Part from "./Part.tsx";

/**
 *
 * @param param0 kurssin sisältö
 * @returns Palauttaa react-komponentin, jossa mapilla kurssin sisällöt
 */
const Content = ({ props }: { props: CoursePart[] }) => {
  return (
    <div>
      {props.map((course: CoursePart) => (
        <Part props={course} />
      ))}
    </div>
  );
};

export default Content;
