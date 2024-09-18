import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useModFS } from "@Hooks/useModFS";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SuFile } from "@Native/SuFile";
import ModFS from "modfs";
import { Activities } from ".";
import { ModConfActivityExtra } from "./ModConfActivity";

const ModConfStandaloneActivity = () => {
  const { context } = useActivity();
  const { modFS, _modFS } = useModFS();

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
            const confFile = new SuFile(modFS("MCALONEMETA", { MODID: item }));
            if (!confFile.exist()) return null;

            try {
              const metaData = JSON.parse(confFile.read());

              if (!metaData.id && metaData.id !== item) return null;

              return (
                <>
                  <ListItem key={metaData.id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        context.pushPage<ModConfActivityExtra, any>({
                          component: Activities.ModConf,
                          key: `${metaData.id}_configure_standalone`,
                          extra: {
                            indexFile: metaData.main
                              ? ModFS.format(metaData.main, { MODID: item, ..._modFS })
                              : modFS("MCALONEIDX", { MODID: item }),
                            cwd: metaData.cwd
                              ? ModFS.format(metaData.cwd, { MODID: item, ..._modFS })
                              : modFS("MCALONECWD", { MODID: item }),
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
