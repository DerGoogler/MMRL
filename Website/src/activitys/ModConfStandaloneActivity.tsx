import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useModFS } from "@Hooks/useModFS";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SuFile } from "@Native/SuFile";
import { SuZip } from "@Native/SuZip";
import { path } from "@Util/path";
import { ModConfActivity, ModConfActivityExtra } from "./ModConfActivity";

const ModConfStandaloneActivity = () => {
  const { context } = useActivity();
  const { modFS } = useModFS();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>ModConf Standalone</Toolbar.Center>
      </Toolbar>
    );
  };

  const mcalone = new SuFile(modFS("MCALONE"));

  if (!mcalone.exist()) {
    return <Page renderToolbar={renderToolbar}>No files</Page>;
  }

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <List>
          {mcalone.list().map((item) => {
            if (path.extname(item) !== ".zip") return null;

            const zipFile = modFS("MCALONE") + "/" + item;

            try {
              const fs = new SuZip(zipFile, "modconf.json");
              const metaData = JSON.parse(fs.read());

              if (!(metaData.id && metaData.index)) return null;

              return (
                <>
                  <ListItem key={metaData.id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        context.pushPage<ModConfActivityExtra, any>({
                          component: ModConfActivity,
                          key: `${metaData.id}_configure_standalone`,
                          extra: {
                            standaloneFile: fs.getZipPath(),
                            index: metaData.index,
                            cwd: "/",
                            modId: metaData.id,
                          },
                        });
                      }}
                    >
                      <ListItemText primary={metaData.name} secondary={metaData.description} />
                    </ListItemButton>
                  </ListItem>
                </>
              );
            } catch {
              return null;
            }
          })}
        </List>
      </Page.RelativeContent>
    </Page>
  );
};

export default ModConfStandaloneActivity;
