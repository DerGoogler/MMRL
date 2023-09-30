import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-markdown";
import { Stack, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextareaMarkdown, { Command, TextareaMarkdownRef } from "textarea-markdown-editor";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import { Markup } from "@Components/Markdown";
import FetchTextActivity from "./FetchTextActivity";
import { ConfigureView } from "@Components/ConfigureView";
import { ConfigureActivity } from "./ConfigureActivity";

interface CustomCommand extends Command {
  icon: React.ElementType;
  iconStyle?: React.CSSProperties;
}

const defText = `<Box sx={{p:1}}>
<Alert severity="info">
  <AlertTitle>Still in development!</AlertTitle>
  This configure screen is still in development, the api may change in future
</Alert>
</Box>      

<List subheader={<ListSubheader>Settings</ListSubheader>}>
<ListItemDialogEditText
    id="rootfs"
    scope="mkshrc"
    inputLabel="Path"
    type="text"
    title="Change ROOTFS"
    initialValue="/data/mkuser"
    description="Changing this path will move/create a new environment">
  <ListItemText primary="Default ROOTFS" secondary={"lol"} />
</ListItemDialogEditText>
<ListItem>
  <ListItemText primary="Show service notification" />
  <Switch id="show_service_notify" defaultState={true} />
</ListItem>
</List>

<Divider/>

<List subheader={<ListSubheader>Project</ListSubheader>}>
<OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/mkshrc/issues")}>
  <ListItemButton>
    <ListItemText primary="Report a issue" />
  </ListItemButton>
</OnClick>
<OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/mkshrc")}>
  <ListItemButton>
    <ListItemText primary="Source code" />
  </ListItemButton>
</OnClick>
</List>`;

export interface PlaygroundExtra {
  title: string;
  previewPage: React.ElementType<any> & Function;
  preview(props: React.PropsWithChildren): React.JSX.Element;
  commands: CustomCommand[];
}

const PlaygroundsActivity = () => {
  const { context, extra } = useActivity<PlaygroundExtra>();
  const { strings } = useStrings();

  const [description, setDescription] = React.useState(defText);

  const markdownRef = React.useRef<TextareaMarkdownRef>(null);
  const markdownRefAdvanced = React.useRef<AceEditor>(null);

  const isLargeScreen = useMediaQuery("(min-width:600px)");

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
    ...extra.commands,
  ];

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
            {isLargeScreen && (
              <Preview>
                <extra.preview>{description}</extra.preview>
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

export default PlaygroundsActivity;
