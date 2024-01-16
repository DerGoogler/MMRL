import { Box, Stack, styled } from "@mui/material";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { IntentPusher, useActivity } from "@Hooks/useActivity";
import PreviewIcon from "@mui/icons-material/Preview";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import Editor, { Monaco } from "@monaco-editor/react";
import { ErrorBoundaryProps, ErrorBoundaryState, errorBoundaryInitialState } from "@Components/ErrorBoundary";
import editorTheme from "@Util/editorTheme"; 

export interface PlaygroundExtra {
  title: string;
  editorMode?: string;
  defaultText?: string;
  previewPage: IntentPusher["component"];
  preview: React.FunctionComponent<any> | React.ComponentType<any>;
}

export interface PreviewErrorBoundaryChildren extends React.PropsWithChildren {
  modid: string;
  hasError: boolean;
}

interface PreviewErrorBoundaryProps extends Omit<ErrorBoundaryProps, "fallback"> {
  modid: string;
  renderElement: React.FunctionComponent<PreviewErrorBoundaryChildren> | React.ComponentType<PreviewErrorBoundaryChildren>;
}
interface PreviewErrorBoundaryState extends ErrorBoundaryState {}

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
      return <div>{this.state.error?.message}</div>;
    }

    return <this.props.renderElement modid={this.props.modid} children={this.props.children} hasError={this.state.hasError} />;
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

const PlaygroundsActivity = () => {
  const { context, extra } = useActivity<PlaygroundExtra>();

  const [description, setDescription] = React.useState(extra.defaultText || "");
  const [errBoundKey, setErrBoundKey] = React.useState(0);

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
                <Box component="section" sx={{ width: "100%", height: "100%" }}>
                  <PreviewErrorBoundary
                    key={"preview_error_bound_key_" + errBoundKey}
                    modid="preview"
                    children={description}
                    renderElement={extra.preview}
                  />
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
  borderColor: "rgba(0, 0, 0, 0.23)",
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

export default PlaygroundsActivity;
