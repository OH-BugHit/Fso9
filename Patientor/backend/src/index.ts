import express from "express";
import cors from "cors";
import pingRouter from "./routes/pingRoute";
import diagnosesRouter from "./routes/diagnosesRoute";
import patientsRouter from "./routes/patientsRoute";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());

const PORT = 3001;

app.use("/api/ping", pingRouter);
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
