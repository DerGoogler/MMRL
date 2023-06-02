import { useNativeStorage } from "./useNativeStorage";

export function useDarkmode(): boolean {
  const [isDarkmode] = useNativeStorage("enableDarkmode_switch", false);
  return isDarkmode;
}
