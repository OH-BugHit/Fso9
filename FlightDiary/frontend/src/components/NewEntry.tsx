import { useState } from "react";
import { addDiary } from "../services/diarySevice";
import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  NotifyMessage,
  Visibility,
  Weather,
} from "../types";
import axios from "axios";
import DisplayMessage from "./DisplayMessage";
import Notification from "./Notification";

interface PropTypes {
  diaries: NonSensitiveDiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  notifyMessage: NotifyMessage;
  setNotifyMessage: React.Dispatch<React.SetStateAction<NotifyMessage>>;
}

const NewEnty = ({
  diaries,
  setDiaries,
  notifyMessage,
  setNotifyMessage,
}: PropTypes) => {
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
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          const notifyMessage = {
            message: error.response?.data,
            messageType: "error",
            length: 5000,
          };
          DisplayMessage({ notifyMessage, setNotifyMessage });
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={notifyMessage} />
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Date</td>
              <td>
                <input
                  type="date"
                  id="start"
                  name="date"
                  value={date}
                  min="2023-01-01"
                  max="2024-12-31"
                  onChange={({ target }) => setDate(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Visibility</td>
              <td className="radioB">
                great
                <input
                  type="radio"
                  name="visibilityFilter"
                  onChange={() => setVisibility("great" as Visibility)}
                />
                good
                <input
                  type="radio"
                  name="visibilityFilter"
                  onChange={() => setVisibility("good" as Visibility)}
                />
                ok
                <input
                  type="radio"
                  name="visibilityFilter"
                  onChange={() => setVisibility("ok" as Visibility)}
                />
                poor
                <input
                  type="radio"
                  name="visibilityFilter"
                  onChange={() => setVisibility("poor" as Visibility)}
                />
              </td>
            </tr>
            <tr>
              <td>Weather</td>
              <td className="radioB">
                sunny
                <input
                  type="radio"
                  name="weatherFilter"
                  onChange={() => setWeather("sunny" as Weather)}
                />
                rainy
                <input
                  type="radio"
                  name="weatherFilter"
                  onChange={() => setWeather("rainy" as Weather)}
                />
                cloudy
                <input
                  type="radio"
                  name="weatherFilter"
                  onChange={() => setWeather("cloudy" as Weather)}
                />
                stormy
                <input
                  type="radio"
                  name="weatherFilter"
                  onChange={() => setWeather("stormy" as Weather)}
                />
                windy
                <input
                  type="radio"
                  name="weatherFilter"
                  onChange={() => setWeather("windy" as Weather)}
                />
              </td>
            </tr>
            <tr>
              <td>Comment</td>
              <td>
                <input
                  type="text"
                  value={comment}
                  name="commet"
                  onChange={({ target }) => setComment(target.value)}
                  placeholder="comment on flight"
                />
              </td>
            </tr>
            <tr>
              <td>
                <button className="addButton" type="submit">
                  add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default NewEnty;
