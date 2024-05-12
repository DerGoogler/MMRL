import { Box, Stack, styled } from "@mui/material";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { IntentPusher, useActivity } from "@Hooks/useActivity";
import PreviewIcon from "@mui/icons-material/Preview";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import Editor, { Monaco } from "@monaco-editor/react";
import { ErrorBoundaryProps, ErrorBoundaryState, errorBoundaryInitialState } from "@Components/ErrorBoundary";
import editorTheme from "@Util/editorTheme";
import { ModConfView } from "@Components/ModConfView";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useStrings } from "@Hooks/useStrings";
import { useNativeFileStorage } from "@Hooks/useNativeFileStorage";
import { useModFS } from "@Hooks/useModFS";
import Pre from "@Components/dapi/Pre";
import Code from "@Components/dapi/Code";

export interface PlaygroundExtra {
  title: string;
  editorMode?: string;
  defaultText?: string;
  previewPage: IntentPusher["component"];
  preview: React.FunctionComponent<any> | React.ComponentType<any>;
}

export interface PreviewErrorBoundaryChildren extends React.PropsWithChildren {
  hasError: boolean;
}

interface PreviewErrorBoundaryProps extends Omit<ErrorBoundaryProps, "fallback"> {}
interface PreviewErrorBoundaryState extends ErrorBoundaryState {}

const preElementStyle = (theme: any) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
  lineHeight: 1.45,
  overflow: "auto",
  padding: 2,
});

export class PreviewErrorBoundary extends React.Component<PreviewErrorBoundaryProps, PreviewErrorBoundaryState> {
  public constructor(props: PreviewErrorBoundaryProps) {
    super(props);
    this.state = errorBoundaryInitialState;
  }

  public static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Page
          sx={{ p: 1 }}
          renderToolbar={() => {
            return (
              <Toolbar modifier="noshadow">
                <Toolbar.Center>Complile error</Toolbar.Center>
              </Toolbar>
            );
          }}
        >
          <Pre sx={preElementStyle}>
            <Code>{this.state.error.message}</Code>
          </Pre>

          <Pre sx={preElementStyle}>
            <Code>{this.state.errorInfo.componentStack}</Code>
          </Pre>
        </Page>
      );
    }

    return this.props.children;
  }
}

const createDependencyProposals = (monaco: typeof monacoEditor, range: any): any => {
  // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
  // here you could do a server side lookup
  return [
    {
      label: "native",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "",
      insertText: "native",
      range: range,
    },
    {
      label: "ignore",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "",
      insertText: "// @ts-ignore",
      range: range,
    },
  ];
};

const editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: Monaco) => {
  monaco.editor.defineTheme("editorTheme", editorTheme);
  monaco.editor.setTheme("editorTheme");

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: "React.createElement",
    reactNamespace: "React",
    allowNonTsExtensions: true,
    allowJs: true,
    target: monaco.languages.typescript.ScriptTarget.ES2015,
  });

  monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: createDependencyProposals(monaco, range),
      };
    },
  });
  editor.focus();
};

const ModConfPlaygroundActivity = () => {
  const { context, extra } = useActivity<PlaygroundExtra>();
  const { strings } = useStrings();
  const { modFS } = useModFS();
  const [description, setDescription] = useNativeFileStorage(modFS("MODCONF_PLAYGROUND"), extra.defaultText || "");
  const [errBoundKey, setErrBoundKey] = React.useState(0);

  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const handlePreview = () => {
    context.pushPage({
      component: ModConfView,
      key: extra.title,
      extra: {
        modulename: "Preview",
      },
      props: {
        modid: modFS("MODCONF_PLAYGROUND_MODID"),
        children: description,
      },
    });
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings("modconf_playground")}</Toolbar.Center>
        <Toolbar.Right>{!isLargeScreen && <Toolbar.Button icon={PreviewIcon} onClick={handlePreview} />}</Toolbar.Right>
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
            <Preview sx={{ border: "unset" }}>
              <Editor
                height="100%"
                width="100%"
                language={extra.editorMode}
                value={description}
                onChange={(value) => {
                  if (value) {
                    setErrBoundKey((prev) => prev + 1);
                    setDescription(value);
                  }
                }}
                onMount={editorDidMount}
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
            </Preview>

            {isLargeScreen && (
              <Preview>
                <Box id="ModConf-Container" component="section" sx={{ position: "relative", width: "100%", height: "100%" }}>
                  <PreviewErrorBoundary key={"preview_error_bound_key_" + errBoundKey}>
                    <ModConfView modid={modFS("MODCONF_PLAYGROUND_MODID")} children={description} />
                  </PreviewErrorBoundary>
                </Box>
              </Preview>
            )}
          </Stack>
        </span>
      </section>
    </Page>
  );
};

const Preview = styled("div")(({ theme }) => ({
  flex: 1,
  flexBasis: "50%",
  height: "100%",
  width: "100%",
  minHeight: "100%",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  borderStyle: "solid",
  borderWidth: "1px",
  minWidth: "0%",
  overflow: "auto",
  borderColor: theme.palette.divider,
  section: {
    position: "absolute",
    overflowY: "scroll",
  },
  ".monaco-editor": {
    borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
  },
  ".overflow-guard": {
    borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
  },
}));

export default ModConfPlaygroundActivity;
