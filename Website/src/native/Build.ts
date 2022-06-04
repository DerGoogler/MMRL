class Build {
  public static readonly VERSION_CODES = {
    get LOLLIPOP(): int {
      return nbuild.VERSION_CODES().LOLLIPOP();
    },
    get LOLLIPOP_MR1(): int {
      return nbuild.VERSION_CODES().LOLLIPOP_MR1();
    },
    get M(): int {
      return nbuild.VERSION_CODES().M();
    },
    get N(): int {
      return nbuild.VERSION_CODES().N();
    },
    get N_MR1(): int {
      return nbuild.VERSION_CODES().N_MR1();
    },
    get O(): int {
      return nbuild.VERSION_CODES().O();
    },
    get O_MR1(): int {
      return nbuild.VERSION_CODES().O_MR1();
    },
    get P(): int {
      return nbuild.VERSION_CODES().P();
    },
    get Q(): int {
      return nbuild.VERSION_CODES().Q();
    },
    get R(): int {
      return nbuild.VERSION_CODES().R();
    },
    get S(): int {
      return nbuild.VERSION_CODES().S();
    },
    get S_V2(): int {
      return nbuild.VERSION_CODES().S_V2();
    },
  };
}

export default Build;
