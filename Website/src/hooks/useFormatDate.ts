import { useMemo } from "react";
import { useSettings } from "./useSettings";

export const useFormatDate = (date: string) => {
  const { settings } = useSettings();

  return useMemo(
    () =>
      Intl.DateTimeFormat(settings.language.value, {
        year: "numeric",
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(Number(date))),
    [date]
  );
};
