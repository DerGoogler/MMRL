import { StyledSection } from "@Components/StyledSection";
import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Ansi from "ansi-to-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { Button, Card } from "react-onsenui";
import { useOnScreen } from "@Hooks/useOnScreen";

function useOnceCall(effect: React.EffectCallback, deps?: React.DependencyList | undefined) {
  const isCalledRef = React.useRef(false);

  React.useEffect(() => {
    if (deps && !isCalledRef.current) {
      isCalledRef.current = true;
      effect();
    }
  }, [effect, deps]);
}

const TerminalActivity = () => {
  const { context, extra } = useActivity<any>();
  const [active, setActive] = React.useState<bool>(true);

  const [lines, setLines] = React.useState<string[]>([]);

  const ref = React.useRef<HTMLDivElement>(null);

  const install = () => {
    // @ts-ignore
    Terminal.exec(
      `magisk --install-module "${extra.path}"`,
      (r) => {
        setLines((prev) => [...prev, r]);
      },
      (code) => {
        if (code) {
          setActive(false);
        }
      }
    );
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>{!active && <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />}</Toolbar.Left>
        <Toolbar.Center>Installer</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page onShow={install} modifier="noshadow" renderToolbar={renderToolbar}>
      <div
        ref={ref}
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Stack
          style={{
            whiteSpace: "pre",
            flex: "0 0 100%",
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: "black",
            color: "white",
            height: "100%",
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          {lines.map((line) => (
            <StyledItem>{line}</StyledItem>
          ))}
        </Stack>
      </div>
    </Page>
  );
};

const StyledItem = styled(Ansi)((theme) => ({
  marginLeft: 8,
  marginRight: 8,
}));

export default TerminalActivity;
