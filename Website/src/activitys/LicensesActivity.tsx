import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useSettings } from "@Hooks/useSettings";
import FlatList from "flatlist-react";

import li from "@Util/licenses.json";
import { os } from "@Native/Os";
import { useTheme } from "@Hooks/useTheme";
import FetchTextActivity from "./FetchTextActivity";

const DepCard = (props: { dep: (typeof li)[0] }) => {
  const { theme } = useTheme();
  const { strings } = useStrings();
  const { context } = useActivity();
  const dep = props.dep;

  const handleOpenSource = () => {
    os.open(dep.source, {
      target: "_blank",
      features: {
        color: theme.palette.primary.main,
      },
    });
  };

  const handleOpenLicense = () => {
    fetch(`https://raw.githubusercontent.com/spdx/license-list-data/main/website/${dep.license}.json`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Fetching license failed");
        }
      })
      .then((json: LicenseSPX) => {
        context.pushPage({
          component: FetchTextActivity,
          key: "license_" + dep.license,
          extra: {
            raw_data: json.licenseText,
            modulename: json.name,
          },
        });
      })
      .catch((err) => {});
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={0}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="caption" display="block">
            {dep.author}
          </Typography>
          <Typography variant="overline" display="block">
            {dep.license}
          </Typography>
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0.5}>
          <Typography variant="h5" gutterBottom>
            {dep.name}
          </Typography>
          <Typography variant="caption" display="block">
            {dep.version}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {dep.description}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} mt={1}>
        <Button disableElevation variant="contained" size="small" onClick={handleOpenLicense}>
          {strings("license")}
        </Button>
        <Button disableElevation variant="outlined" size="small" onClick={handleOpenSource}>
          {strings("source")}
        </Button>
      </Stack>
    </Card>
  );
};

const LicensesActivity = () => {
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { context } = useActivity();
  const { theme } = useTheme();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings("licenses")}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <FlatList
          list={li}
          renderItem={(dep) => <DepCard dep={dep} />}
          renderOnScroll
          display={{
            row: true,
            rowGap: "8px",
          }}
        />
      </Page.RelativeContent>
    </Page>
  );
};

export default LicensesActivity;
