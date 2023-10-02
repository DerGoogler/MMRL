import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useStrings } from "@Hooks/useStrings";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

type RootManager = {
  name: string;
  package: string;
};

const NoRootActivity = () => {
  const { strings } = useStrings();
  const rootManagers: RootManager[] = [
    {
      name: "Open KernelSU",
      package: "me.weishu.kernelsu",
    },
    {
      name: "Open Magisk",
      package: "com.topjohnwu.magisk",
    },
    {
      name: "Open Magisk Delta",
      package: "io.github.huskydg.magisk",
    },
  ];

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Center>Missing root</Toolbar.Center>
      </Toolbar>
    );
  };

  const getRootManagers = rootManagers.filter((manager) => window.__os__.isPackageInstalled(manager.package));

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Card elevation={0}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {strings("failed")}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {strings("no_root_message")}
            </Typography>
          </CardContent>
        </Card>
        <ButtonGroup
          fullWidth
          sx={{ mt: 1 }}
          disableElevation
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
        >
          {getRootManagers.map((manager) => (
            <Button
              key={manager.name}
              onClick={() => {
                window.__os__.launchAppByPackageName(manager.package);
              }}
            >
              {manager.name}
            </Button>
          ))}
        </ButtonGroup>
      </Page.RelativeContent>
    </Page>
  );
};

export default NoRootActivity;
