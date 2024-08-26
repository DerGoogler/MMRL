import { SuFile } from "@Native/SuFile";
import { useFetch } from "./useFetch";

interface BlacklistedModule {
  id: string;
  source: string;
  hidden: boolean;
  notes: string;
  antifeatures: Track["antifeatures"];
}

export const useBlacklist = () => {
  const [bl] = useFetch<BlacklistedModule[]>("https://gr.dergoogler.com/gmr/json/blacklist.json", { type: "json" });
  return bl ? bl : [];
};
