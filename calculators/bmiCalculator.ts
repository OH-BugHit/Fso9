interface BmiValues {
  value1: number; // Pituus
  value2: number; // Paino
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

/**
 * Laskee painoindeksin
 * @param a Pituus
 * @param b Paino
 * @returns Palauttaa tekstinä painoindeksin kategorian
 */
export const calculateBmi = (a: number, b: number): string => {
  // tässä tää sulkujen ulkopuolella oleva kertoo palautettavan
  const bmi = b / ((a / 100) ^ 2);
  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi < 17:
      return "Underweight (Moderate thinness)";
    case bmi < 18.5:
      return "Underweight (Mild thinness)";
    case bmi < 25:
      return "Normal (healthy weight)"; // Or "Normal range"
    case bmi < 30:
      return "Overweight (Pre-obese)";
    case bmi < 35:
      return "Obese (Class 1)";
    case bmi < 40:
      return "Obese (Class 2)";
    default:
      return "Obese (Class 3)";
  }
};

try {
  //console.log(calculateBmi(180, 74)); Hardcoded test
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2)); // tämä antaa ilmoituksen aina startatessa serveri, oikeasti en jättäisti tätä näin, mutta jätetään vaihe näkyville
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
