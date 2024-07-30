import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useModFS } from "@Hooks/useModFS";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SuFile } from "@Native/SuFile";
import { ZipFS } from "@Native/ZipFS";
import { path } from "@Util/path";
import { ModConfActivity } from "./ModConfActivity";

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

            try {
              const fs = new ZipFS(modFS("MCALONE") + "/" + item);
              const metaData = JSON.parse(fs.read("modconf.json"));

              return (
                <>
                  <ListItem key={metaData.id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        context.pushPage({
                          component: ModConfActivity,
                          key: `${metaData.id}_configure_standalone`,
                          extra: {
                            standaloneFile: fs.getPath(),
                            index: "src/index.jsx",
                            cwd: "src",
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
