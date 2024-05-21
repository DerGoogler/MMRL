export interface BlacklistedModule {
  id: string;
  source: string;
  hidden: boolean;
  antifeatures: Track["antifeatures"];
}

export const blacklistedModules: BlacklistedModule[] = [
  {
    id: "zygisksu",
    source: "https://github.com/Dr-TSNG/ZygiskNext",
    hidden: false,
    antifeatures: ["Obfuscation", "NoSourceSince"],
  },
  {
    id: "ATWEAKER",
    source: "https://github.com/C0d3h01/AndroidTweaker",
    hidden: false,
    antifeatures: ["NoSourceSince"],
  },
];
