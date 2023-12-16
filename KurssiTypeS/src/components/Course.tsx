import { CourseProps } from "../types";

// Yksittäinen kurssi, nimi ja määrä
const Course = (prop: CourseProps) => {
  return (
    <li>
      <div className="course">
        {prop.name} {prop.exerciseCount}
      </div>
    </li>
  );
};

export default Course;
