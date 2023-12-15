interface RatingDescription {
  description: string;
  rating: number;
}

export interface Results {
  periodLenght: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExersizeValues {
  data: number[];
  target: number;
}

const parseArgumentsEx = (argsv: string[]): ExersizeValues => {
  if (argsv.length < 4) {
    throw new Error("Not enough arguments");
  }
  const args = argsv.slice(2).map((arg) => parseFloat(arg));

  args.forEach((element) => {
    if (isNaN(element)) {
      throw new Error("Provided values were not numbers!");
    }
  });
  const data = args.slice(1);
  return {
    data: data,
    target: args[0],
  };
};

/**
 *
 * @param avg Harjoittelun keskiarvotunnit
 * @param target Tavoitetunnit
 * @returns Palauttaa olion, jolla interface RatingDescription tyypitykset
 */
const giveDescription = (avg: number, target: number): RatingDescription => {
  if (avg >= target) {
    return {
      description: "Great job! Eat, sleep, workout, repeat!",
      rating: 3,
    };
  }
  if (avg > target / 2) {
    return {
      description: "Not bad but could be better",
      rating: 2,
    };
  }
  return {
    description: "Man... c'mon!",
    rating: 1,
  };
};

/**
 *
 * @param data Taulukko, joka sisältää päiväkohtaiset harjoitustunnit
 * @param target Harjoitustuntien keskiarvon tavoite (päiväkohtainen tavoite)
 * @returns Palauttaa Results-tyypitetyt olion, joka sisältää tulokset
 */
export const calculateExercises = (data: number[], target: number): Results => {
  // tässä tää sulkujen ulkopuolella oleva kertoo palautettavan
  let daysTrainded = 0;
  let trainingHours = 0;
  data.forEach((element) => {
    if (element > 0) {
      daysTrainded++;
    }
    trainingHours += element;
  });
  const avg = trainingHours / data.length;
  const success = avg >= target;

  const { description, rating } = giveDescription(avg, target);

  return {
    periodLenght: data.length,
    trainingDays: daysTrainded,
    success: success,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: avg,
  };
};

try {
  //const data = [3, 0, 2, 4.5, 0, 3, 1];
  //const target = 2;
  //console.log(calculateExercises(data, target));

  const { data, target } = parseArgumentsEx(process.argv);
  console.log(calculateExercises(data, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
