class Build {
  public static VERSION_CODES = class {
    public static BASE = 1;

    public static BASE_1_1 = 2;

    public static CUPCAKE = 3;

    public static DONUT = 4;

    public static ECLAIR = 5;

    public static ECLAIR_0_1 = 6;

    public static ECLAIR_MR1 = 7;

    public static FROYO = 8;

    public static GINGERBREAD = 9;

    public static GINGERBREAD_MR1 = 10;

    public static HONEYCOMB = 11;

    public static HONEYCOMB_MR1 = 12;

    public static HONEYCOMB_MR2 = 13;

    public static ICE_CREAM_SANDWICH = 14;

    public static ICE_CREAM_SANDWICH_MR1 = 15;

    public static JELLY_BEAN = 16;

    public static JELLY_BEAN_MR1 = 17;

    public static JELLY_BEAN_MR2 = 18;

    public static KITKAT = 19;

    public static KITKAT_WATCH = 20;

    public static L = 21;

    public static LOLLIPOP = 21;

    public static LOLLIPOP_MR1 = 22;

    public static M = 23;

    public static N = 24;

    public static N_MR1 = 25;

    public static O = 26;

    public static O_MR1 = 27;

    public static P = 28;

    public static Q = 29;

    public static R = 30;

    public static S = 31;

    public static S_V2 = 32;

    public static TIRAMISU = 33;
  };

  public static parseVersion(version: number) {
    switch (version) {
      case this.VERSION_CODES.BASE:
        return "Android 1.0";
      case this.VERSION_CODES.BASE_1_1:
        return "Android 1.1 (Petit Four)";
      case this.VERSION_CODES.CUPCAKE:
        return "Android 1.5 (Cupcake)";
      case this.VERSION_CODES.DONUT:
        return "Android 1.6 (Donut)";
      case this.VERSION_CODES.ECLAIR:
        return "Android 2.0 (Eclair)";
      case this.VERSION_CODES.ECLAIR_0_1:
        return "Android 2.0.1 (Eclair)";
      case this.VERSION_CODES.ECLAIR_MR1:
        return "Android 2.1 (Eclair)";
      case this.VERSION_CODES.FROYO:
        return "Android 2.2 (Froyo)";
      case this.VERSION_CODES.GINGERBREAD:
        return "Android 2.3.0 - 2.3.2 (Gingerbread)";
      case this.VERSION_CODES.GINGERBREAD_MR1:
        return "Android 2.3.3 - 2.3.7 (Gingerbread)";
      case this.VERSION_CODES.HONEYCOMB:
        return "Android 3.0 (Honeycomb)";
      case this.VERSION_CODES.HONEYCOMB_MR1:
        return "Android 3.1 (Honeycomb)";
      case this.VERSION_CODES.HONEYCOMB_MR2:
        return "Android 3.2 (Honeycomb)";
      case this.VERSION_CODES.ICE_CREAM_SANDWICH:
        return "Android 4.0.1 - 4.0.2 (Ice Cream Sandwich)";
      case this.VERSION_CODES.ICE_CREAM_SANDWICH_MR1:
        return "Android 4.0.3 - 4.0.4 (Ice Cream Sandwich)";
      case this.VERSION_CODES.JELLY_BEAN:
        return "Android 4.1 (Jelly Bean)";
      case this.VERSION_CODES.JELLY_BEAN_MR1:
        return "Android 4.2 (Jelly Bean)";
      case this.VERSION_CODES.JELLY_BEAN_MR2:
        return "Android 4.3 (Jelly Bean)";
      case this.VERSION_CODES.KITKAT:
        return "Android 4.4 (KikKat)";
      case this.VERSION_CODES.KITKAT_WATCH:
        return "Android 4.4 (KitKat)";
      case this.VERSION_CODES.LOLLIPOP:
        return "Android 5.0 (Lollipop)";
      case this.VERSION_CODES.LOLLIPOP_MR1:
        return "Android 5.1 (Lollipop)";
      case this.VERSION_CODES.M:
        return "Android 6.0 (Marshmallow)";
      case this.VERSION_CODES.N:
        return "Android 7.0 (Nougat)";
      case this.VERSION_CODES.N_MR1:
        return "Android 7.1 (Nougat)";
      case this.VERSION_CODES.O:
        return "Android 8.0 (Oreo)";
      case this.VERSION_CODES.O_MR1:
        return "Android 8.1 (Oreo)";
      case this.VERSION_CODES.P:
        return "Android 9.0 (Pie)";
      case this.VERSION_CODES.Q:
        return "Android 10 (Quince Tart)";
      case this.VERSION_CODES.R:
        return "Android 11 (Red Velvet Cake)";
      case this.VERSION_CODES.S:
        return "Android 12 (Snow Cone)";
      case this.VERSION_CODES.S_V2:
        return "Android 12L (Snow Cone)";
      case this.VERSION_CODES.TIRAMISU:
        return "Android 12 (Tiramisu)";
      default:
        return "Sdk: " + version;
    }
  }
}

export { Build };
