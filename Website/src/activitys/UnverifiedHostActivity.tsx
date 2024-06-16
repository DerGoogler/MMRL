import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Divider } from "@mui/material";
import {Anchor} from "@Components/dapi/Anchor";

const UnverifiedHostActivity = () => {
  const { strings } = useStrings();
  const { theme } = useTheme();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Center>{strings("unverified_host")}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Card elevation={0}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {strings("caution")}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {strings("unverified_host_text", {
                url: (
                  <Typography component="span" sx={{ fontSize: "unset", color: theme.palette.text.link }}>
                    {location.host}
                  </Typography>
                ),
              })}
            </Typography>
          </CardContent>
          <Divider variant="middle" />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {strings("unverified_host_text_help", {
                issues: (
                  <Anchor href="https://github.com/DerGoogler/MMRL/issues" icon={BugReportIcon}>
                    issues
                  </Anchor>
                ),
              })}
            </Typography>
          </CardContent>
        </Card>
      </Page.RelativeContent>
    </Page>
  );
};

export default UnverifiedHostActivity;
