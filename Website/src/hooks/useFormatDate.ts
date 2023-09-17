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
      }).format(new Date(Number(date))),
    [date]
  );
};
