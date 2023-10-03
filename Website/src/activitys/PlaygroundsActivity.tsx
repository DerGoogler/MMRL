import { Box, Stack, styled } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import MonacoEditor from "react-monaco-editor";
import { useTheme } from "@Hooks/useTheme";

export interface PlaygroundExtra {
  title: string;
  editorMode?: string;
  defaultText?: string;
  previewPage: React.ElementType<any> & Function;
  preview(props: React.PropsWithChildren): React.JSX.Element;
}

const PlaygroundsActivity = () => {
  const { context, extra } = useActivity<PlaygroundExtra>();
  const { strings } = useStrings();
  const { theme } = useTheme();

  const [description, setDescription] = React.useState(extra.defaultText || "");

  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const handlePreview = () => {
    context.pushPage({
      component: extra.previewPage,
      key: extra.title,
      extra: {
        modulename: "Preview",
        raw_data: description,
      },
    });
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{extra.title}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <section style={{ padding: 8, height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <span style={{ flex: 1, display: "flex", marginTop: 4 }}>
          <Stack
            style={{
              height: "100%",
              width: "100%",
            }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Box
              sx={{
                height: "100%",
                flex: 1,
                width: "100%",
                minHeight: "100%",
                position: "relative",
                ".react-monaco-editor-container": {
                  borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
                  ".monaco-editor": {
                    borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
                  },
                  ".overflow-guard": {
                    borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
                  },
                },
              }}
            >
              <MonacoEditor
                height="100%"
                width="100%"
                theme="vs-dark"
                language={extra.editorMode}
                value={description}
                options={{
                  autoIndent: "full",
                  contextmenu: true,
                  fontFamily: "monospace",
                  fontSize: 13,
                  lineHeight: 24,
                  hideCursorInOverviewRuler: true,
                  matchBrackets: "always",
                  minimap: {
                    enabled: false,
                  },
                  scrollbar: {
                    horizontalSliderSize: 4,
                    verticalSliderSize: 18,
                  },
                  selectOnLineNumbers: true,
                  roundedSelection: false,
                  readOnly: false,
                  cursorStyle: "line",
                  automaticLayout: true,
                }}
              />
            </Box>

            {isLargeScreen && (
              <Preview>
                <Box component="section" sx={{ width: "100%" }}>
                  <extra.preview>{description}</extra.preview>
                </Box>
              </Preview>
            )}
          </Stack>
        </span>
        {!isLargeScreen && (
          <Stack
            style={{
              marginTop: 8,
            }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Button fullWidth variant="outlined" onClick={handlePreview}>
              Preview
            </Button>
          </Stack>
        )}
      </section>
    </Page>
  );
};

const Preview = styled("div")(({ theme }) => ({
  flex: 1,
  height: "100%",
  width: "100%",
  minHeight: "100%",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  borderStyle: "solid",
  borderWidth: "1px",
  minWidth: "0%",
  overflow: "auto",
  borderColor: "rgba(0, 0, 0, 0.23)",
  section: {
    position: "absolute",
    overflowY: "scroll",
  },
}));

export default PlaygroundsActivity;
