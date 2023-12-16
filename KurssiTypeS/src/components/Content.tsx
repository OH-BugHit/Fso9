import { CourseProps } from "../types";
import Course from "./Course.tsx";

/**
 *
 * @param param0 kurssin sisältö
 * @returns Palauttaa react-komponentin, jossa mapilla kurssin sisällöt
 */
const Content = ({ props }: { props: CourseProps[] }) => {
  return (
    <div>
      {props.map((course: CourseProps) => (
        <Course
          key={course.name}
          name={course.name}
          exerciseCount={course.exerciseCount}
        />
      ))}
    </div>
  );
};

export default Content;
