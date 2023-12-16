import { HeaderProps } from "../types";

/**
 *
 * @param props Kurssin otsikko
 * @returns Palauttaa react komponentin jossa otsikko
 */
const Header = (props: HeaderProps) => {
  return (
    <p>
      <h1>{props.name}</h1>
    </p>
  );
};

export default Header;
