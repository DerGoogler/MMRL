import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSettings, useTheme } from "@Hooks/useSettings";
import Giscus from "@giscus/react";
import { RelativeStyledSection } from "@Components/StyledSection";

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
        <Toolbar.Center>{strings.comments}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <RelativeStyledSection>
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
      </RelativeStyledSection>
    </Page>
  );
};

export { CommentsActivity };
