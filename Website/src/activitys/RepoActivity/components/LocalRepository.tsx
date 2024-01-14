import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { StyledListItemText } from "@Components/StyledListItemText";
import { useRepos } from "@Hooks/useRepos";
import { useSettings } from "@Hooks/useSettings";
import { useStrings } from "@Hooks/useStrings";
import { List, ListItem, ListItemButton, ListItemIcon, ListSubheader } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { DeleteRounded, LanguageRounded, SupportRounded, UploadFileRounded, VolunteerActivismRounded } from "@mui/icons-material";
import { Android12Switch } from "@Components/Android12Switch";
import { os } from "@Native/Os";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useConfirm } from "material-ui-confirm";
import { useFetch } from "usehooks-ts";
import { ProgressCircular } from "react-onsenui";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface ListItemProps {
  part?: any;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: () => void;
}

interface LocalRepositoryProps {
  repo: RepoConfig;
}

const MListItem = React.memo<ListItemProps>((props) => {
  return props.part ? (
    <ListItemButton onClick={props.onClick}>
      <ListItemIcon>
        <props.icon />
      </ListItemIcon>
      <StyledListItemText primary={props.text} />
    </ListItemButton>
  ) : null;
});

export const LocalRepository = React.memo<LocalRepositoryProps>((props) => {
  const { repo } = props;
  const { strings } = useStrings();
  const { settings } = useSettings();
  const confirm = useConfirm();
  const { actions } = useRepos();
  const [enabled, setEnabled] = React.useState(!settings.disabled_repos.includes(repo.base_url));
  const [open, setOpen] = React.useState(false);

  const { data } = useFetch<Repo>(`${repo.base_url}json/modules.json`);

  const formatLastUpdate = useFormatDate(data ? data.metadata.timestamp * 1000 : 0);

  if (!data) {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton height={70} />
      </Box>
    );
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List sx={{ bgcolor: "transparent" }}>
      <ListItem>
        <ListItemIcon onClick={handleClick}>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <StyledListItemText primary={repo.name} secondary={formatLastUpdate} />

        <Android12Switch
          edge="end"
          onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            actions.setRepoEnabled({
              id: repo.base_url,
              callback(state) {
                setEnabled(!state.some((elem) => elem === repo.base_url));
              },
            });
          }}
          checked={enabled}
        />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MListItem
            part={repo.website}
            icon={LanguageRounded}
            text={strings("website")}
            onClick={() => {
              if (repo.website) {
                os.open(repo.website);
              }
            }}
          />
          <MListItem
            part={repo.support}
            icon={SupportRounded}
            text={strings("support")}
            onClick={() => {
              if (repo.support) {
                os.open(repo.support);
              }
            }}
          />
          <MListItem
            part={repo.donate}
            icon={VolunteerActivismRounded}
            text={strings("donate")}
            onClick={() => {
              if (repo.donate) {
                os.open(repo.donate);
              }
            }}
          />
          <MListItem
            part={repo.submission}
            icon={UploadFileRounded}
            text={strings("submit_module")}
            onClick={() => {
              if (repo.submission) {
                os.open(repo.submission);
              }
            }}
          />
          <MListItem
            part
            icon={DeleteRounded}
            text={strings("remove")}
            onClick={() => {
              confirm({
                title: "Delete?",
                confirmationText: "Sure",
                description: strings("confirm_repo_delete", {
                  name: repo.name,
                }),
              }).then(() => {
                actions.removeRepo({
                  id: repo.base_url,
                });
              });
            }}
          />
        </List>
      </Collapse>
    </List>
  );
});
