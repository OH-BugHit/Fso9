import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { Results } from "./exerciseCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  const result = {
    weight: weight,
    height: height,
    bmi: calculateBmi(Number(height), Number(weight)),
  };
  return res.send(result);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  const dataArray: number[] = (daily_exercises as string[]).map(Number);

  if (dataArray.some(isNaN) || isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result: Results = calculateExercises(dataArray, Number(target));
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
