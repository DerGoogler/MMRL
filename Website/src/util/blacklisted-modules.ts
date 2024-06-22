export interface BlacklistedModule {
  id: string;
  source: string;
  hidden: boolean;
  notes: string;
  antifeatures: Module["antifeatures"];
}

export const blacklistedModules: BlacklistedModule[] = [
  {
    id: "zygisksu",
    source: "https://github.com/Dr-TSNG/ZygiskNext",
    hidden: false,
    notes: "",
    antifeatures: ["Obfuscation", "NoSourceSince"],
  },
  {
    id: "ATWEAKER",
    source: "https://github.com/C0d3h01/AndroidTweaker",
    hidden: false,
    notes: "",
    antifeatures: ["NoSourceSince"],
  },
  {
    id: "STRP",
    source: "https://github.com/CRANKV2/CRV2",
    hidden: false,
    notes:
      "Aggressive terminal logging - Sends device specs to external server - Includes APK without source - Includes obfuscated scripts",
    antifeatures: ["UnaskedRemoval", "Tracking", "NoSourceSince", "Obfuscation"],
  },
  {
    id: "STRPxZRAM",
    source: "https://github.com/CRANKV2/ZRAM",
    hidden: false,
    notes: "",
    antifeatures: ["UnaskedRemoval", "Tracking", "NoSourceSince", "Obfuscation"],
  },
  {
    id: "STRPxSPOOFER",
    source: "https://github.com/CRANKV2/STRPxSPOOFER",
    hidden: false,
    notes: "Sends device specs to external server",
    antifeatures: ["UnaskedRemoval", "Tracking", "Obfuscation"],
  },
];
