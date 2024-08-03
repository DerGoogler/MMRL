import { useMemo } from "react";
import { useSettings } from "./useSettings";

export const useFormatDate = (date: int, multiply: boolean = true) => {
  const { settings } = useSettings();

  return useMemo(
    () =>
      Intl.DateTimeFormat(settings.language.value, {
        year: "numeric",
        day: "2-digit",
        month: "short",
        hour12: true,
      }).format(new Date(multiply ? date * 1000 : date)),
    [date]
  );
};
