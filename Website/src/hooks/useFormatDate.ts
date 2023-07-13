import { useRef } from "react";

export const useFormatDate = (date: Date) => {
  // Don't use state it causes to many re-renders
  const hours = useRef<number>(date.getHours());
  const minutes = useRef<number | string>(date.getMinutes());
  const ampm = hours.current >= 12 ? "pm" : "am";
  hours.current = hours.current % 12;
  hours.current = hours.current ? hours.current : 12;
  minutes.current = (minutes.current as number) < 10 ? "0" + minutes.current : minutes.current;
  const strTime = hours.current + ":" + minutes.current + " " + ampm;
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
};
