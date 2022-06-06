import { os } from "./os";

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

export interface IBuildVersion {
  get SDK_INT(): int;
  get SECURITY_PATCH(): string;
  get CODENAME(): string;
  get RELEASE(): string;
}

var nbuild: any;

export default class Build {
  public static VERSION = class implements IBuildVersion {
    public get SDK_INT(): number {
      return nbuild.VERSION.SDK_INT;
    }
    public get SECURITY_PATCH(): string {
      return nbuild.VERSION().SECURITY_PATCH();
    }
    public get CODENAME(): string {
      return nbuild.VERSION().CODENAME();
    }
    public get RELEASE(): string {
      return nbuild.VERSION().RELEASE();
    }
  };

  public static VERSION_CODES = class {
    public static get LOLLIPOP(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().LOLLIPOP();
      } else {
        return 0;
      }
    }
    public static get LOLLIPOP_MR1(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().LOLLIPOP_MR1();
      } else {
        return 0;
      }
    }
    public static get M(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().M();
      } else {
        return 0;
      }
    }
    public static get N(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().N();
      } else {
        return 0;
      }
    }
    public static get N_MR1(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().N_MR1();
      } else {
        return 0;
      }
    }
    public static get O(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().O();
      } else {
        return 0;
      }
    }
    public static get O_MR1(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().O_MR1();
      } else {
        return 0;
      }
    }
    public static get P(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().P();
      } else {
        return 0;
      }
    }
    public static get Q(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().Q();
      } else {
        return 0;
      }
    }
    public static get R(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().R();
      } else {
        return 0;
      }
    }
    public static get S(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().S();
      } else {
        return 0;
      }
    }
    public static get S_V2(): int {
      if (os.isAndroid) {
        return nbuild.VERSION_CODES().S_V2();
      } else {
        return 0;
      }
    }
  };
}
