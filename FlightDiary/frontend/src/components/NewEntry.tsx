import { useState } from "react";
import { addDiary } from "../services/diarySevice";
import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  Visibility,
  Weather,
} from "../../types";

interface PropTypes {
  diaries: NonSensitiveDiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const NewEnty = ({ diaries, setDiaries }: PropTypes) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    console.log("click");

    event.preventDefault();
    if (date && visibility && weather) {
      const newDiary: NewDiaryEntry = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      };
      try {
        const diary: NonSensitiveDiaryEntry = await addDiary(newDiary);
        setDiaries(diaries.concat(diary));
        setDate("");
        setVisibility(undefined);
        setWeather(undefined);
        setComment("");
      } catch (exeption) {
        /*DisplayMessage(setNotifyMessage, {
          message: exeption.response.data.error,
          messageType: "error",
        });
        */
      }
    }
  };
  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type="text"
            value={date}
            name="date"
            onChange={({ target }) => setDate(target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div>
          visibility
          <input
            type="text"
            value={visibility}
            name="visibility"
            onChange={({ target }) => setVisibility(target.value as Visibility)}
            placeholder="great | good | ok | poor"
          />
        </div>
        <div>
          weather
          <input
            type="text"
            value={weather}
            name="weather"
            onChange={({ target }) => setWeather(target.value as Weather)}
            placeholder="sunny | rainy | clody | stormy | windy"
          />
        </div>
        <div>
          comment
          <input
            type="text"
            value={comment}
            name="commet"
            onChange={({ target }) => setComment(target.value)}
            placeholder="comment on flight"
          />
        </div>
        <div>
          <button className="addButton" type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEnty;
