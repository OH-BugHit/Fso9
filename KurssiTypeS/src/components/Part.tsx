import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const extractRequirements = (props: string[]) => {
  let teksti = "";
  props.forEach((element) => {
    teksti += `, ${element}`;
  });
  teksti = teksti.substring(1);
  return teksti;
};

const renderCourse = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>{" "}
          <p className="description">{props.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>{" "}
          project exercises {props.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <p className="description">{props.description}</p>
          Material available at: {props.backgroundMaterial}
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <p className="description">{props.description}</p>
          <p className="requirements">
            required skills:{extractRequirements(props.requirements)}
          </p>
        </div>
      );
    default:
      return assertNever(props);
  }
};

// Yksittäinen kurssi, nimi ja määrä
const Part = ({ props }: { props: CoursePart }) => {
  return (
    <li>
      <div className="part">{renderCourse(props)}</div>
    </li>
  );
};

export default Part;
