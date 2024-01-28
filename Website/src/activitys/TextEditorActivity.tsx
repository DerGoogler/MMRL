import * as React from "react";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { ActivityContext, useActivity } from "@Hooks/useActivity";
import AceEditor from "react-ace";
import ReactAce from "react-ace/lib/ace";
import SaveIcon from "@mui/icons-material/Save";

export interface TextEditorActivityExtra {
  title: string;
  initialValue: string;
  /**
   * @param value Entered code value
   * @param context Shared TextEditorActivity context
   */
  onSaveClick(value: string, context: ActivityContext): void;
  mode?: string | object;
}

const TextEditorActivity = () => {
  const { context, extra } = useActivity<TextEditorActivityExtra>();
  const { title, mode, initialValue, onSaveClick } = extra;

  const aceRef = React.useRef<ReactAce | null>(null);

  const [code, setCode] = React.useState<string>(initialValue);

  const handleSaveText = React.useCallback(() => {
    if (typeof onSaveClick !== "function") throw new TypeError("onSaveClick is not a function");
    onSaveClick(code, context);
  }, [code]);

  React.useEffect(() => {
    if (aceRef.current && aceRef.current.refEditor) {
      aceRef.current.refEditor.addEventListener(
        "contextmenu",
        function (event) {
          event.returnValue = true;
          if (typeof event.stopPropagation === "function") {
            event.stopPropagation();
          }
          if (typeof event.cancelBubble === "function") {
            (event as any).cancelBubble();
          }
        },
        true
      );
    }
  }, []);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{title}</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={SaveIcon} onClick={handleSaveText} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <AceEditor
        ref={aceRef}
        mode={mode}
        theme="github"
        value={code}
        width="100%"
        height="100%"
        onChange={(_value) => setCode(_value)}
        name="UNIQUE_ID_OF_DIV"
        showPrintMargin={false}
        fontSize="unset"
        editorProps={{
          $blockScrolling: true,
        }}
      />
    </Page>
  );
};

export default TextEditorActivity;
