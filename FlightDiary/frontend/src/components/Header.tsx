import { HeaderProps } from "../types";

/**
 *
 * @param props Otsikko
 * @returns Palauttaa react komponentin jossa otsikko
 */
const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

export default Header;
