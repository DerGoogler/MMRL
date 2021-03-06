import { os } from "./os";

/**
 * @deprecated
 */
export interface IBuildVersionCodes {
  get LOLLIPOP(): int;
  get LOLLIPOP_MR1(): int;
  get M(): int;
  get N(): int;
  get N_MR1(): int;
  get O(): int;
  get O_MR1(): int;
  get P(): int;
  get Q(): int;
  get R(): int;
  get S(): int;
  get S_V2(): int;
}

/**
 * @deprecated
 */
export interface IBuildVersion {
  get SDK_INT(): int;
  get SECURITY_PATCH(): string;
  get CODENAME(): string;
  get RELEASE(): string;
}

export var IBuild: typeof Build;

declare const nbuild: any;

class Build {
  public static readonly VERSION = {
    get SDK_INT(): int {
      return nbuild.VERSION().SDK_INT();
    },
    get SECURITY_PATCH(): string {
      return nbuild.VERSION().SECURITY_PATCH();
    },
    get CODENAME(): string {
      return nbuild.VERSION().CODENAME();
    },
    get RELEASE(): string {
      return nbuild.VERSION().RELEASE();
    },
  };

  public static readonly VERSION_CODES = {
    get LOLLIPOP(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().LOLLIPOP();
      } else {
        return 0;
      }
    },
    get LOLLIPOP_MR1(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().LOLLIPOP_MR1();
      } else {
        return 0;
      }
    },
    get M(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().M();
      } else {
        return 0;
      }
    },
    get N(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().N();
      } else {
        return 0;
      }
    },
    get N_MR1(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().N_MR1();
      } else {
        return 0;
      }
    },
    get O(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().O();
      } else {
        return 0;
      }
    },
    get O_MR1(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().O_MR1();
      } else {
        return 0;
      }
    },
    get P(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().P();
      } else {
        return 0;
      }
    },
    get Q(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().Q();
      } else {
        return 0;
      }
    },
    get R(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().R();
      } else {
        return 0;
      }
    },
    get S(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().S();
      } else {
        return 0;
      }
    },
    get S_V2(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().S_V2();
      } else {
        return 0;
      }
    },
  };
}

export default Build;
