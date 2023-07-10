import { Build } from "@Native/Build";

export const parseAndroidVersion = (version: string) => {
  switch (Number(version)) {
    case Build.VERSION_CODES.BASE:
      return "Android 1.0";
    case Build.VERSION_CODES.BASE_1_1:
      return "Android 1.1 (Petit Four)";
    case Build.VERSION_CODES.CUPCAKE:
      return "Android 1.5 (Cupcake)";
    case Build.VERSION_CODES.DONUT:
      return "Android 1.6 (Donut)";
    case Build.VERSION_CODES.ECLAIR:
      return "Android 2.0 (Eclair)";
    case Build.VERSION_CODES.ECLAIR_0_1:
      return "Android 2.0.1 (Eclair)";
    case Build.VERSION_CODES.ECLAIR_MR1:
      return "Android 2.1 (Eclair)";
    case Build.VERSION_CODES.FROYO:
      return "Android 2.2 (Froyo)";
    case Build.VERSION_CODES.GINGERBREAD:
      return "Android 2.3.0 - 2.3.2 (Gingerbread)";
    case Build.VERSION_CODES.GINGERBREAD_MR1:
      return "Android 2.3.3 - 2.3.7 (Gingerbread)";
    case Build.VERSION_CODES.HONEYCOMB:
      return "Android 3.0 (Honeycomb)";
    case Build.VERSION_CODES.HONEYCOMB_MR1:
      return "Android 3.1 (Honeycomb)";
    case Build.VERSION_CODES.HONEYCOMB_MR2:
      return "Android 3.2 (Honeycomb)";
    case Build.VERSION_CODES.ICE_CREAM_SANDWICH:
      return "Android 4.0.1 - 4.0.2 (Ice Cream Sandwich)";
    case Build.VERSION_CODES.ICE_CREAM_SANDWICH_MR1:
      return "Android 4.0.3 - 4.0.4 (Ice Cream Sandwich)";
    case Build.VERSION_CODES.JELLY_BEAN:
      return "Android 4.1 (Jelly Bean)";
    case Build.VERSION_CODES.JELLY_BEAN_MR1:
      return "Android 4.2 (Jelly Bean)";
    case Build.VERSION_CODES.JELLY_BEAN_MR2:
      return "Android 4.3 (Jelly Bean)";
    case Build.VERSION_CODES.KITKAT:
      return "Android 4.4 (KikKat)";
    case Build.VERSION_CODES.KITKAT_WATCH:
      return "Android 4.4 (KitKat)";
    case Build.VERSION_CODES.LOLLIPOP:
      return "Android 5.0 (Lollipop)";
    case Build.VERSION_CODES.LOLLIPOP_MR1:
      return "Android 5.1 (Lollipop)";
    case Build.VERSION_CODES.M:
      return "Android 6.0 (Marshmallow)";
    case Build.VERSION_CODES.N:
      return "Android 7.0 (Nougat)";
    case Build.VERSION_CODES.N_MR1:
      return "Android 7.1 (Nougat)";
    case Build.VERSION_CODES.O:
      return "Android 8.0 (Oreo)";
    case Build.VERSION_CODES.O_MR1:
      return "Android 8.1 (Oreo)";
    case Build.VERSION_CODES.P:
      return "Android 9.0 (Pie)";
    case Build.VERSION_CODES.Q:
      return "Android 10 (Quince Tart)";
    case Build.VERSION_CODES.R:
      return "Android 11 (Red Velvet Cake)";
    case Build.VERSION_CODES.S:
      return "Android 12 (Snow Cone)";
    case Build.VERSION_CODES.S_V2:
      return "Android 12L (Snow Cone)";
    case Build.VERSION_CODES.TIRAMISU:
      return "Android 12 (Tiramisu)";
    default:
      return "Sdk: " + version;
  }
};
