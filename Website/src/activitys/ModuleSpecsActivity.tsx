import { Divider, List, ListItem, ListSubheader } from "@mui/material";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Page } from "@Components/onsenui/Page";
import { Magisk } from "@Native/Magisk";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Build } from "@Native/Build";

interface Extra {
  prop_url: ModuleProps;
}

function ModuleSpecsActivity() {
  const { context, extra } = useActivity<Extra>();
  const { strings } = useStrings();

  const { prop_url } = extra;

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Module Requirements</Toolbar.Center>
      </Toolbar>
    );
  };

  const parseAndroidVersion = (version: string) => {
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

  return (
    <Page renderToolbar={renderToolbar}>
      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Default</ListSubheader>}>
        <ListItem>
          <StyledListItemText primary="Changes boot" secondary={prop_url.changeBoot === "true" ? "Yes" : "No"} />
        </ListItem>

        <ListItem>
          <StyledListItemText primary="Needs ramdisk" secondary={prop_url.needRamdisk === "true" ? "Yes" : "No"} />
        </ListItem>

        <ListItem>
          <StyledListItemText primary="MMT-Reborn" secondary={prop_url.mmtReborn === "true" ? "Yes" : "No"} />
        </ListItem>
      </List>

      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Minimum</ListSubheader>}>
        <ListItem>
          <StyledListItemText primary="Operating System" secondary={prop_url.minApi ? parseAndroidVersion(prop_url.minApi) : "Undefined"} />
        </ListItem>

        <ListItem>
          <StyledListItemText primary="Magisk" secondary={prop_url.minMagisk ? Magisk.PARSE_VERSION(prop_url.minMagisk) : "Undefined"} />
        </ListItem>
      </List>

      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Recommended</ListSubheader>}>
        <ListItem>
          <StyledListItemText primary="Operating System" secondary={prop_url.maxApi ? parseAndroidVersion(prop_url.maxApi) : "Undefined"} />
        </ListItem>
      </List>

      <Divider />
    </Page>
  );
}

export default ModuleSpecsActivity;
