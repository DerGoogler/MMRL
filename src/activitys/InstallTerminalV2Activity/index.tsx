import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useSettings } from "@Hooks/useSettings";
import { alpha, Box, LinearProgress, Stack, Typography } from "@mui/material";
import { view, WindowManager } from "@Native/View";
import { formatString } from "@Util/stringFormat";
import FlatList from "flatlist-react";
import React from "react";
import { useExploreInstall } from "./hooks/useExploreInstall";
import { LinesProvider, useLines } from "./hooks/useLines";
import { useLocalInstall } from "./hooks/useLocalInstall";

export interface TerminalActivityExtra {
  exploreInstall: boolean;
  modSource: string[];
  id: string;
  source?: string;
  issues?: string;
}

const colors = {
  R: "\x1b[0m",
  BRIGHT: "\x1b[1m",
  DIM: "\x1b[2m",
  UNDERSCORE: "\x1b[4m",
  FG: {
    BLACK: "\x1b[30m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
    WHITE: "\x1b[37m",
    GRAY: "\x1b[90m",
  },
  BG: {
    BLACK: "\x1b[40m",
    RED: "\x1b[41m",
    GREEN: "\x1b[42m",
    YELLOW: "\x1b[43m",
    BLUE: "\x1b[44m",
    MAGENTA: "\x1b[45m",
    CYAN: "\x1b[46m",
    WHITE: "\x1b[47m",
    GRAY: "\x1b[100m",
  },
};

const InstallerComponent = () => {
  const { context, extra } = useActivity<TerminalActivityExtra>();

  const termEndRef = React.useRef<HTMLDivElement>(null);

  const { lines } = useLines();

  // ensure that it is always the same function
  const nativeVolumeEventPrevent = React.useCallback((e: Event) => {
    e.preventDefault();
  }, []);
  React.useEffect(() => {
    document.addEventListener("volumeupbutton", nativeVolumeEventPrevent, false);
    document.addEventListener("volumedownbutton", nativeVolumeEventPrevent, false);
    view.addFlags([WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON]);
    return () => {
      document.removeEventListener("volumeupbutton", nativeVolumeEventPrevent, false);
      document.removeEventListener("volumedownbutton", nativeVolumeEventPrevent, false);
      view.clearFlags([WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON]);
    };
  }, []);

  const [termScrollBottom] = useSettings("term_scroll_bottom");
  const [termScrollBehavior] = useSettings("term_scroll_behavior");

  const [terminalWordWrap] = useSettings("terminal_word_wrap");
  const [terminalNumbericLines] = useSettings("terminal_numberic_lines");

  if (termScrollBottom) {
    const termBehavior = React.useMemo(() => termScrollBehavior, [termScrollBehavior]);

    React.useEffect(() => {
      termEndRef.current?.scrollIntoView({ behavior: termBehavior.value, block: "end", inline: "nearest" });
    }, [lines]);
  }

  const [exploreInstaller, downloadProgress] = useExploreInstall();
  const [localInstaller] = useLocalInstall();

  const install = () => {
    const { exploreInstall } = extra;

    if (exploreInstall) {
      exploreInstaller();
    } else {
      localInstaller();
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          position: "relative !important",
        }}
      >
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Install</Toolbar.Center>
        {downloadProgress !== 0 && (
          <LinearProgress
            sx={{ width: "100%", left: 0, right: 0, position: "absolute", bottom: 0 }}
            variant="determinate"
            value={downloadProgress}
          />
        )}
      </Toolbar>
    );
  };

  return (
    <Page
      sx={{
        pl: 1,
        pr: 1,
        // removing bottom window insets
        pb: "0px !important",
      }}
      onShow={install}
      modifier="noshadow"
      renderToolbar={renderToolbar}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Stack
          style={{
            whiteSpace: !terminalWordWrap ? "pre" : "unset",
            flex: "0 0 100%",
            color: "white",
            height: "100%",
            fontSize: "smaller",
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          <FlatList
            list={lines}
            renderItem={(line, key) => (
              <Box
                sx={{
                  display: "flex",
                  ":hover": {
                    backgroundColor: alpha("#fff", 0.03),
                  },
                  code: {
                    wordBreak: terminalWordWrap ? "break-all" : "unset",
                  },
                }}
              >
                {terminalNumbericLines && (
                  <Typography
                    sx={(theme) => ({
                      minWidth: "40px",
                      paddingRight: "1em",
                      fontSize: "unset",
                      marginLeft: "calc(18px - 1em)",
                      color: theme.palette.text.secondary,
                      textAlign: "right",
                      textDecoration: "none",
                    })}
                  >
                    {Number(key) + 1}
                  </Typography>
                )}

                <line.component key={key} {...line.props} />
              </Box>
            )}
            renderOnScroll
            renderWhenEmpty={() => <></>}
          />
        </Stack>
      </Box>
      <Box sx={{ height: view.getWindowBottomInsets() }} ref={termEndRef} />
    </Page>
  );
};

export const InstallTerminalV2Activity = () => {
  return (
    <LinesProvider
      commands={{
        color: (args, _, add) => {
          add.addText(formatString(args[0], colors));
        },
        clearTerminal: (_, __, add) => {
          add.setLines([]);
        },
        setLastLine: (args, __, add) => {
          add.setLines((p) => p.slice(0, -1));
          add.addText(args[0]);
        },
        removeLastLine: (_, __, add) => {
          add.setLines((p) => p.slice(0, -1));
        },
        addImage: (args, opt, add) => {
          const { width, height } = opt;
          add.addImage(args[0], {
            sx: {
              width: width || "80vmin",
              height: height,
            },
          });
        },
        addButton: (args, opt, add) => {
          const { variant } = opt;
          add.addButton(args[0], {
            sx: {
              width: "50vmin",
              mt: 1,
              mb: 1,
            },
            variant: variant,
          });
        },
      }}
    >
      <InstallerComponent />
    </LinesProvider>
  );
};

export default InstallTerminalV2Activity;
