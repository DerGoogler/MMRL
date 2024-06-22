import { SearchActivity } from "@Activitys/SearchActivity";
import { useActivity } from "./useActivity";
import ListItemButton from "@mui/material/ListItemButton";
import { ModuleViewActivity } from "@Activitys/ModuleViewActivity";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import { SuFile } from "@Native/SuFile";
import { useModFS } from "./useModFS";
import { VerifiedIcon } from "@Components/icons/VerifiedIcon";

export function useOpenModuleSearch<L extends Module[]>(list: L) {
  const { context } = useActivity();
  const { modFS } = useModFS();

  return (initialSearch: string = "") => {
    context.pushPage({
      component: SearchActivity,
      key: "SearchActivity",
      props: {
        list: list,
        initialSearch: initialSearch,
        search: {
          by: ["id", "name", "author", "description"],
          onEveryWord: true,
          caseInsensitive: true,
        },

        renderList(item: Module, index) {
          return (
            <ListItemButton
              key={item.id}
              onClick={() => {
                context.pushPage({
                  component: ModuleViewActivity,
                  key: "ModuleViewActivity",
                  extra: item,
                });
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.name}
                  sx={(theme) => ({
                    bgcolor: theme.palette.primary.dark,
                    boxShadow: "0 -1px 5px rgba(0,0,0,.09), 0 3px 5px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.3), 0 1px 3px rgba(0,0,0,.15)",
                    borderRadius: "20%",
                    mr: 1.5,
                  })}
                  src={item.icon}
                >
                  {item.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                    <Typography>{item.name}</Typography>

                    <VerifiedIcon isVerified={item.verified} />
                  </Stack>
                }
                secondary={
                  <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0.5}>
                    <Typography variant="body2">{item.version}</Typography>
                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                      {SuFile.exist(modFS("PROPS", { MODID: item.id })) && <Chip size="small" label="Installed" />}
                    </Stack>
                  </Stack>
                }
              />
            </ListItemButton>
          );
        },
      },
    });
  };
}
