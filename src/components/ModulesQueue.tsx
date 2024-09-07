import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { view } from "@Native/View";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useStrings } from "@Hooks/useStrings";
import { os } from "@Native/Os";
import { useFormatBytes } from "@Hooks/useFormatBytes";

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

interface ModulesQueueProps extends React.PropsWithChildren {}

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

  const removeModule = (index) => {
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

  return (
    <ModulesQueueContext.Provider value={value}>
      {props.children}

      <Drawer anchor="bottom" open={open} onClose={toggleDrawer}>
        <Box
          role="presentation"
          sx={{ p: 2, pb: `calc(16px + ${view.getWindowBottomInsets()}px)` }}
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
        </Box>
      </Drawer>
    </ModulesQueueContext.Provider>
  );
};

export const useModuleQueue = () => React.useContext(ModulesQueueContext);
