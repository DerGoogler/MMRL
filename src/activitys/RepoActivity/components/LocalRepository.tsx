import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useRepos } from "@Hooks/useRepos";
import { useStrings } from "@Hooks/useStrings";
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { DeleteRounded, LanguageRounded, SupportRounded, UploadFileRounded, VolunteerActivismRounded } from "@mui/icons-material";
import { os } from "@Native/Os";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useConfirm } from "material-ui-confirm";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetch } from "@Hooks/useFetch";

interface ListItemProps {
  part?: any;
  text: React.ReactNode;
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
      <ListItemText primary={props.text} />
    </ListItemButton>
  ) : null;
});

export const LocalRepository = React.memo<LocalRepositoryProps>((props) => {
  const { repo } = props;
  const { strings } = useStrings();
  const confirm = useConfirm();
  const { actions } = useRepos();
  const [enabled, setEnabled] = React.useState(actions.isRepoEnabled(repo.base_url));
  const [open, setOpen] = React.useState(false);

  const [data] = useFetch<Repo>(`${repo.base_url}json/modules.json`);

  const formatLastUpdate = useFormatDate(data ? data.metadata.timestamp : 0);

  const handleRepoDelete = () => {
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
  };

  if (!data) {
    return (
      <ListItem
        secondaryAction={
          <IconButton onClick={handleRepoDelete} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary="Loading..." />
      </ListItem>
    );
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem>
        <ListItemIcon onClick={handleClick}>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText
          primary={repo.name}
          secondary={
            <>
              <Typography variant="body2">{formatLastUpdate}</Typography>

              <Typography variant="body2" sx={{}}>
                Holds{" "}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    background: "-webkit-linear-gradient(132deg, rgba(188,2,194,1) 10%,rgba(255,255,255,1) 100%, rgba(74,20,140,0.5) 50%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {data.modules.length.toString()}
                </Typography>{" "}
                modules
              </Typography>
            </>
          }
        />

        <Switch
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
          <MListItem part icon={DeleteRounded} text={strings("remove")} onClick={handleRepoDelete} />
        </List>
      </Collapse>
    </>
  );
});
