import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api";

export const getAllDiaries = async () => {
  return axios
    .get<DiaryEntry[]>(`${baseUrl}/diaries`)
    .then((respose) => respose.data);
};

export const addDiary = async (newDiary: NewDiaryEntry) => {
  const { data } = await axios.post<NonSensitiveDiaryEntry>(
    `${baseUrl}/diaries`,
    newDiary
  );
  return data;
};
