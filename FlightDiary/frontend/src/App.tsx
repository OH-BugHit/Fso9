import Header from "./components/Header";
import Entries from "./components/Entries";
import NewEnty from "./components/NewEntry";
import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry, NotifyMessage } from "./types";
import { getAllDiaries } from "./services/diarySevice";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notifyMessage, setNotifyMessage] = useState<NotifyMessage>({
    message: "",
    messageType: "success",
    length: 0,
  });

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <Header name="Olli's Flight Diary" />
      <NewEnty
        diaries={diaries}
        setDiaries={setDiaries}
        notifyMessage={notifyMessage}
        setNotifyMessage={setNotifyMessage}
      />
      <Entries entries={diaries} />
    </div>
  );
};

export default App;
