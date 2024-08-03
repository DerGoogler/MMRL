import React from "react";
import { Stack, Box, styled, Button } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { Ansi } from "@Components/Ansi";
import { useConfirm } from "material-ui-confirm";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { GestureDetector } from "@Components/onsenui/GestureDetector";
import { useNativeStorage } from "@Hooks/useNativeStorage";

function TestTerminalActivity() {
  const { context } = useActivity();
  const [lines, setLines] = React.useState<any[]>([]);
  const confirm = useConfirm();

  const addText = (props: object) => {
    setLines((lines) => [
      ...lines,
      {
        component: Ansi,
        props: {
          linkify: true,
          sx: {
            ml: 1,
            mr: 1,
          },
          ...props,
        },
      },
    ]);
  };

  const addButton = (props: object) => {
    setLines((lines) => [
      ...lines,
      {
        component: Button,
        props: {
          variant: "contained",
          sx: {
            width: "50vmin",
            m: 1,
          },
          ...props,
        },
      },
    ]);
  };

  const renderToolbar = () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          background: "linear-gradient(22deg, rgba(188,2,194,1) 0%, rgba(74,20,140,1) 100%)",
        }}
      >
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Test Terminal</Toolbar.Center>
      </Toolbar>
    );
  };

  const startLog = React.useMemo<any>(() => {
    addText({ children: "- \x1b[31mlolol" });
    addText({ children: "- \x1b[31mlolol" });
    addText({ children: "- \x1b[41mlolol" });
    addText({ children: "- https://github.com/DerGoogler/MMRL" });

    addText({ children: " " });
    addText({
      children:
        "\x1b[93mYou can press the \x1b[33;4mbutton\x1b[93;0m\x1b[93m below to \x1b[33;4mreboot\x1b[93;0m\x1b[93m your device\x1b[0m",
    });
    addButton({
      children: "Reboot",
      startIcon: <RestartAltIcon />,
      onClick: () => {
        confirm({
          title: "Reboot device?",
          description: "Are you sure to reboot your device?",
          confirmationText: "Yes",
        }).then(() => {
          console.log("REBOOT!!!");
        });
      },
    });

    addText({
      children:
        "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
    });
    addText({
      children: "Support for this module:",
    });
    addText({
      children: "- \x1b[32mIssues: \x1b[33mhttps://github.com/Googlers-Repo/mmrl_install_tools/issues\x1b[0m",
    });
    addText({
      children: "- \x1b[32mSource: \x1b[33mhttps://github.com/Googlers-Repo/mmrl_install_tools\x1b[0m",
    });
  }, []);

  const [fontSize, setFontSize] = useNativeStorage("term_fodnt_size", 12);

  return (
    <Page onShow={startLog} renderToolbar={renderToolbar} modifier="noshadow">
      <Box
        component={GestureDetector}
        onPinch={(e: any) => {
          setFontSize((init) => {
            const newFontSize = init * (1 + (e.gesture.scale - 1) * 0.5);
            return Math.min(Math.max(newFontSize, 12), 100);
          });
        }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          height: "100%",
        }}
      >
        <Stack
          sx={{
            fontSize: fontSize,
            whiteSpace: "pre",
            flex: "0 0 100%",
            color: "white",
            height: "100%",
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          {lines.map((line) => (
            <line.component {...line.props} />
          ))}
        </Stack>
      </Box>
    </Page>
  );
}

export default TestTerminalActivity;
