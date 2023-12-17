import Header from "./components/Header";
import Entries from "./components/Entries";
import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "../types";
import { getAllDiaries } from "./services/diarySevice";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <Header name="Diary entries" />
      <Entries entries={diaries} />
    </div>
  );
};

export default App;
