import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import { Divider, List, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import File from "@Native/File";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Android12Switch } from "@Components/Android12Switch";
import { os } from "@Native/Os";
import { useSettings, useTheme } from "@Hooks/useSettings";
import Giscus from "@giscus/react";
import { StyledSection } from "@Components/StyledSection";

type Extra = {
  id: string;
};

const CommentsActivity = () => {
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { theme } = useTheme();
  const { context, extra } = useActivity<Extra>();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Comments</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <StyledSection>
        <Giscus
          repo="DerGoogler/MMRL"
          repoId="R_kgDOHO8GRQ"
          category="Modules"
          categoryId="DIC_kwDOHO8GRc4CQRnw"
          mapping="specific"
          term={extra.id}
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          // theme="preferred_color_scheme"
          lang={settings.language.value}
          loading="lazy"
        />
      </StyledSection>
    </Page>
  );
};

export { CommentsActivity };
