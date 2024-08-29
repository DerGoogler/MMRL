import React from "react";
import { Add, Remove } from "@mui/icons-material";
import { Stack, Box, Slider } from "@mui/material";
import FlatList from "flatlist-react";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";
import { Page } from "@Components/onsenui/Page";
import { BuildConfig } from "@Native/BuildConfig";
import { useActivity } from "@Hooks/useActivity";
import { useTheme } from "@Hooks/useTheme";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useSettings } from "@Hooks/useSettings";
import { Ansi } from "@Components/Ansi";
import { Terminal } from "@Native/Terminal";

const LogcatActivity = () => {
  const [fontSize, setFontSize] = useNativeStorage("mmrlini_log_terminal", 100);
  const { context } = useActivity();
  const { theme } = useTheme();
  const [lines, setLines] = React.useState<string[]>([]);
  const [termScrollBottom] = useSettings("term_scroll_bottom");
  const [termScrollBehavior] = useSettings("term_scroll_behavior");

  const termEndRef = React.useRef<HTMLDivElement>(null);

  if (termScrollBottom) {
    const termBehavior = React.useMemo(() => termScrollBehavior, [termScrollBehavior]);

    React.useEffect(() => {
      termEndRef.current?.scrollIntoView({ behavior: termBehavior.value, block: "end", inline: "nearest" });
    }, [lines]);
  }

  const addLine = (line: string) => {
    setLines((lines) => [...lines, line]);
  };

  const startLog = () => {
    const logcat = new Terminal();
    logcat.env = {
      PACKAGENAME: BuildConfig.APPLICATION_ID,
    };
    logcat.onLine = (line) => {
      addLine(line);
    };
    logcat.onExit = (code) => {};
    logcat.exec("logcat --pid=`pidof -s $PACKAGENAME` -v color");
  };

  return (
    <Page
      onShow={startLog}
      renderToolbar={() => (
        <Toolbar modifier="noshadow">
          <Toolbar.Left>
            <Toolbar.BackButton onClick={context.popPage} />
          </Toolbar.Left>
          <Toolbar.Center>Logcat</Toolbar.Center>
        </Toolbar>
      )}
      modifier="noshadow"
      renderBottomToolbar={() => {
        return (
          <BottomToolbar sx={{ background: "none", backgroundColor: theme.palette.background.default }}>
            <Stack spacing={2} direction="row" sx={{ height: "100%", ml: 1, mr: 1 }} alignItems="center">
              <Add color="secondary" />
              <Slider
                value={fontSize}
                onChange={(event, newValue) => {
                  setFontSize(Number(newValue));
                }}
                step={10}
                marks
                min={20}
                max={200}
              />
              <Remove color="secondary" />
            </Stack>
          </BottomToolbar>
        );
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Stack
          style={{
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
          <FlatList
            list={lines}
            renderItem={(line, key) => (
              <Box
                key={key}
                component={Ansi}
                sx={{
                  fontSize: fontSize ? `${fontSize}%` : "none",
                  ml: 1,
                  mr: 1,
                }}
              >
                {line}
              </Box>
            )}
            renderOnScroll
            renderWhenEmpty={() => <></>}
          />
        </Stack>
      </div>
      <div ref={termEndRef} />
    </Page>
  );
};

export { LogcatActivity };
