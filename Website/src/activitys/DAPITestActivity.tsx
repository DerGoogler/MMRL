import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-markdown";
import { Stack, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextareaMarkdown, { Command, TextareaMarkdownRef } from "textarea-markdown-editor";
import {
  CheckRounded,
  CloseRounded,
  FormatBoldRounded,
  FormatItalicRounded,
  FormatListBulletedRounded,
  FormatListNumberedRounded,
  FormatQuoteRounded,
  FormatStrikethroughRounded,
  ImageRounded,
  LinkRounded,
  WarningAmberRounded,
  Redo,
  Undo,
} from "@mui/icons-material";
import { isDesktop } from "react-device-detect";
import AceEditor from "react-ace";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { os } from "@Native/Os";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import DescriptonActivity from "./DescriptonActivity";
import { Markup } from "@Components/Markdown";

interface CustomCommand extends Command {
  icon: React.ElementType;
  iconStyle?: React.CSSProperties;
}

const DAPITestActivity = () => {
  const { context, extra } = useActivity();
  const { strings } = useStrings();

  const [description, setDescription] = React.useState("# Extended D-API\n\nThere are more components, try it out!\n\n## Alerts within a box\n\n<paper style=\"padding:8px;\" elevation={1}>\n    <stack spacing>\n        <alert error>This is an error alert — check it out!</alert>\n        <alert warning>This is a warning alert — check it out!</alert>\n        <alert info>This is an info alert — check it out!</alert>\n        <alert success>This is a success alert — check it out!</alert>\n    </stack>\n</paper>\n\n### Code\n\n```html\n<paper style=\"padding:8px;\" elevation={1}>\n    <stack spacing>\n        <alert error>This is an error alert — check it out!</alert>\n        <alert warning>This is a warning alert — check it out!</alert>\n        <alert info>This is an info alert — check it out!</alert>\n        <alert success>This is a success alert — check it out!</alert>\n    </stack>\n</paper>\n```");

  const markdownRef = React.useRef<TextareaMarkdownRef>(null);
  const markdownRefAdvanced = React.useRef<AceEditor>(null);

  const customTextareaCommands: CustomCommand[] = [
    {
      name: "undo",
      icon: Undo,
      handler: ({ cursor }) => {
        markdownRefAdvanced.current?.editor.undo();
      },
    },
    {
      name: "redo",
      icon: Redo,

      handler: ({ cursor }) => {
        markdownRefAdvanced.current?.editor.redo();
      },
    },

    {
      name: "bold",
      icon: FormatBoldRounded,
    },
    {
      name: "italic",
      icon: FormatItalicRounded,
    },
    {
      name: "strike-through",
      icon: FormatStrikethroughRounded,
    },
    {
      name: "link",
      icon: LinkRounded,
    },
    {
      name: "image",
      icon: ImageRounded,
    },
    {
      name: "unordered-list",
      icon: FormatListBulletedRounded,
    },
    {
      name: "ordered-list",
      icon: FormatListNumberedRounded,
    },
    {
      name: "block-quotes",
      icon: FormatQuoteRounded,
    },
    {
      name: "insert-checkmark",
      icon: CheckRounded,
      iconStyle: {
        color: "#1a7f37",
      },
      handler: ({ cursor }) => {
        cursor.insert(`${cursor.MARKER}<checkmark/>${cursor.MARKER}`);
      },
    },
    {
      name: "insert-warnmark",
      icon: WarningAmberRounded,
      iconStyle: {
        color: "#d29922",
      },
      handler: ({ cursor }) => {
        cursor.insert(`${cursor.MARKER}<warnmark/>${cursor.MARKER}`);
      },
    },
    {
      name: "insert-dangermark",
      icon: CloseRounded,
      iconStyle: {
        color: "#cf222e",
      },
      handler: ({ cursor }) => {
        cursor.insert(`${cursor.MARKER}<dangermark/>${cursor.MARKER}`);
      },
    },
  ];

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>D-API Tester</Toolbar.Center>
      </Toolbar>
    );
  };

  const handlePreview = () => {
    context.pushPage<any>({
      component: DescriptonActivity,

      props: {
        key: "dapi-preview",
        extra: {
          title: "Preview",
          desc: description,
        },
      },
    });
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <section style={{ padding: 8, height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <ToggleButtonGroup
          size="small"
          style={{
            marginTop: 8,
            marginBottom: 4,
            overflow: "auto",
          }}
        >
          {customTextareaCommands.map((El) => (
            <ToggleButton value={El.name} key={String(El.name)} onClick={() => markdownRef.current?.trigger(El.name)}>
              {/* @ts-ignore */}
              <El.icon style={El.iconStyle} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
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
            <TextareaMarkdown.Wrapper ref={markdownRef} commands={customTextareaCommands}>
              <Editor
                ref={markdownRefAdvanced}
                mode="markdown"
                onChange={(val: string) => {
                  setDescription(val);
                }}
                value={description}
                placeholder={""}
              />
            </TextareaMarkdown.Wrapper>
            {!os.isAndroid && isDesktop && (
              <Preview>
                <Markup children={description} />
              </Preview>
            )}
          </Stack>
        </span>
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
  article: {
    position: "absolute",
    overflowY: "scroll",
  },
}));

type EditorProps = {
  mode: "json" | "markdown";
  value: string;
  placeholder: string;
  onChange?: (value: string, event?: any) => void;
};

const StyledAceEditor = styled("div")(({ theme }) => {
  return {
    height: "100%",
    flex: 1,
    width: "100%",
    minHeight: "100%",
    position: "relative",
    "& .ace_editor": {
      borderRadius: theme.shape.borderRadius,
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "& .ace-tm": {
      backgroundColor: theme.palette.background.default,
      "& .ace_gutter": {
        backgroundColor: theme.palette.divider,
      },
    },
  };
});

export const Editor = React.forwardRef<AceEditor, EditorProps>((props, ref) => (
  <>
    <StyledAceEditor>
      <AceEditor
        ref={ref}
        mode={props.mode}
        width="100%"
        height="100%"
        fontSize="inherit"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        enableBasicAutocompletion={false}
        enableLiveAutocompletion={false}
        enableSnippets={false}
        setOptions={{
          showLineNumbers: true,
        }}
      />
    </StyledAceEditor>
  </>
));

export { DAPITestActivity };
