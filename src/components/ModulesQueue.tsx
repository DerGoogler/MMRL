import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { view } from "@Native/View";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useStrings } from "@Hooks/useStrings";
import { os } from "@Native/Os";
import { useFormatBytes } from "@Hooks/useFormatBytes";
import { Shell } from "@Native/Shell";
import { useConfirm } from "material-ui-confirm";
import { ActivityContext } from "@Hooks/useActivity";
import InstallTerminalV2Activity, { TerminalActivityExtra } from "@Activitys/InstallTerminalV2Activity";

interface ModulesQueueContext {
  addModule: (queue: Queue) => void;
  removeModule: (index: any) => void;
  toggleQueueView: () => void;
  isQueueOpen: boolean;
}
const ModulesQueueContext = React.createContext<ModulesQueueContext>({
  addModule(queue) {},
  removeModule(index) {},
  toggleQueueView() {},
  isQueueOpen: false,
});

interface Queue {
  name: string;
  url: string;
  size?: number;
}

interface ModulesQueueProps extends React.PropsWithChildren {
  context: ActivityContext;
}

const QueueItem = ({ module, onClick }: any) => {
  const [moduleFileSize, moduleFileSizeByteText] = useFormatBytes(module.size);
  const { strings } = useStrings();

  return (
    <ListItem disablePadding>
      <ListItemText primary={module.name} secondary={`${moduleFileSize} ${moduleFileSizeByteText}`} />
      <Button variant="outlined" color="secondary" onClick={onClick}>
        {strings("remove")}
      </Button>
    </ListItem>
  );
};

export const ModulesQueue = (props: ModulesQueueProps) => {
  const [queue, setQueue] = React.useState<Queue[]>([]);
  const [open, setOpen] = React.useState(false);
  const { strings } = useStrings();
  const confirm = useConfirm();
  const { context } = props;

  const addModule = (queue: Queue) => {
    setQueue((qu) => {
      if (qu.some((g) => g.url === queue.url)) {
        os.toast(strings("alr_add_queue") as string, Toast.LENGTH_SHORT);
        return qu;
      }

      os.toast(strings("add_t_queue") as string, Toast.LENGTH_SHORT);
      return [...qu, queue];
    });
  };

  const removeModule = (index: number) => {
    setQueue(queue.filter((_, i) => i !== index));
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const value = React.useMemo(
    () => ({
      addModule,
      removeModule,
      toggleQueueView: toggleDrawer,
      isQueueOpen: open,
    }),
    [addModule, removeModule, toggleDrawer, open]
  );

  const isQueueNotEmpty = React.useMemo(() => queue.length !== 0, [queue]);

  return (
    <ModulesQueueContext.Provider value={value}>
      {props.children}

      <Drawer anchor="bottom" open={open} onClose={toggleDrawer}>
        <Box
          role="presentation"
          sx={{ pt: `calc(16px + ${view.getWindowTopInsets()}px)`, p: 2, pb: `calc(16px + ${view.getWindowBottomInsets()}px)` }}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6">{strings("install_queue")}</Typography>
              <Typography color="text.secondary" variant="caption" gutterBottom>
                {strings("install_queue_notice")}
              </Typography>
            </Box>
            <IconButton onClick={toggleDrawer} sx={{ height: "100%", alignSelf: "center" }}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Box sx={{ mt: 2 }}>
            <List>
              {queue.length !== 0 ? (
                queue.map((module, index) => <QueueItem key={`wueue-${index}`} module={module} onClick={() => removeModule(index)} />)
              ) : (
                <>
                  <Typography variant="h6">{strings("install_queue_empty")}</Typography>
                </>
              )}
            </List>
          </Box>

          <Button
            sx={{ mt: 2 }}
            disabled={!(isQueueNotEmpty && os.isAndroid && (Shell.isMagiskSU() || Shell.isKernelSU() || Shell.isAPatchSU()))}
            fullWidth
            variant="contained"
            onClick={() => {
              confirm({
                title: strings("start_mod_ini_queue"),
                description: strings("start_mod_ini_queue_desc"),
                confirmationText: strings("yes"),
              }).then(() => {
                setOpen(false);
                context.pushPage<TerminalActivityExtra, {}>({
                  component: InstallTerminalV2Activity,
                  key: "InstallTerminalV2Activity",
                  extra: {
                    exploreInstall: true,
                    modSource: queue.flatMap((q) => q.url),
                  },
                });
              });
            }}
          >
            {strings("install")}
          </Button>
        </Box>
      </Drawer>
    </ModulesQueueContext.Provider>
  );
};

export const useModuleQueue = () => React.useContext(ModulesQueueContext);
