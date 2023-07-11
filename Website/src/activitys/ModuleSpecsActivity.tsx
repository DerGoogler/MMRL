import { Divider, List, ListItem, ListSubheader } from "@mui/material";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Page } from "@Components/onsenui/Page";
import { Magisk } from "@Native/Magisk";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { StyledListItemText } from "@Components/StyledListItemText";
import { parseAndroidVersion } from "@Util/parseAndroidVersion";
import { RelativeStyledSection } from "@Components/StyledSection";

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

  return (
    <Page renderToolbar={renderToolbar}>
      <RelativeStyledSection zeroMargin>
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

        <Divider />

        <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Minimum</ListSubheader>}>
          <ListItem>
            <StyledListItemText
              primary="Operating System"
              secondary={prop_url.minApi ? parseAndroidVersion(prop_url.minApi) : "Undefined"}
            />
          </ListItem>

          <ListItem>
            <StyledListItemText primary="Magisk" secondary={prop_url.minMagisk ? Magisk.PARSE_VERSION(prop_url.minMagisk) : "Undefined"} />
          </ListItem>
        </List>

        <Divider />

        <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Recommended</ListSubheader>}>
          <ListItem>
            <StyledListItemText
              primary="Operating System"
              secondary={prop_url.maxApi ? parseAndroidVersion(prop_url.maxApi) : "Undefined"}
            />
          </ListItem>
        </List>

        <Divider />
      </RelativeStyledSection>
    </Page>
  );
}

export default ModuleSpecsActivity;
