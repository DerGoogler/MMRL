import Icon from "@Components/Icon";
import { StyledListItemText } from "@Components/StyledListItemText";
import { useRepos } from "@Hooks/useRepos";
import { useSettings } from "@Hooks/useSettings";
import { useStrings } from "@Hooks/useStrings";
import { List, ListItem, ListItemButton, ListItemIcon, ListSubheader } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import {
  DeleteRounded,
  ExtensionRounded,
  LanguageRounded,
  SupportRounded,
  UploadFileRounded,
  VolunteerActivismRounded,
} from "@mui/icons-material";
import React from "react";
import { Android12Switch } from "@Components/Android12Switch";
import { os } from "@Native/Os";
import ons from "onsenui";

interface ListItemProps {
  part?: any;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: () => void;
}

interface LocalRepositoryProps {
  repo: StoredRepo;
}

export const LocalRepository = (props: LocalRepositoryProps) => {
  const { repo } = props;
  const { strings } = useStrings();
  const { settings, setSettings } = useSettings();
  const { actions } = useRepos();
  const [enabled, setEnabled] = React.useState(!settings.disabled_repos.includes(repo.id));
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const MListItem = (props: ListItemProps) => {
    return (
      <>
        {props.part && (
          <ListItemButton onClick={props.onClick}>
            <ListItemIcon>
              <Icon icon={props.icon} />
            </ListItemIcon>
            <StyledListItemText primary={props.text} />
          </ListItemButton>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{repo.name}</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <Icon icon={ExtensionRounded} />
          </ListItemIcon>
          <StyledListItemText id="switch-list-label-eruda" primary={strings.enabled} />
          <Android12Switch
            edge="end"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
              setSettings(
                "disabled_repos",
                (prev) => {
                  if (prev.some((elem) => elem === repo.id)) {
                    return prev.filter((item) => item !== repo.id);
                  } else {
                    return [...prev, repo.id];
                  }
                },
                (state) => {
                  console.log(state);
                  setEnabled(!state.some((elem) => elem === repo.id));
                }
              );
            }}
            checked={enabled}
            inputProps={{
              "aria-labelledby": "switch-list-label-eruda",
            }}
          />
        </ListItem>

        <MListItem
          part={repo.website}
          icon={LanguageRounded}
          text={strings.website}
          onClick={() => {
            if (repo.website) {
              os.open(repo.website);
            }
          }}
        />
        <MListItem
          part={repo.support}
          icon={SupportRounded}
          text={strings.support}
          onClick={() => {
            if (repo.support) {
              os.open(repo.support);
            }
          }}
        />
        <MListItem
          part={repo.donate}
          icon={VolunteerActivismRounded}
          text={strings.donate}
          onClick={() => {
            if (repo.donate) {
              os.open(repo.donate);
            }
          }}
        />
        <MListItem
          part={repo.submitModule}
          icon={UploadFileRounded}
          text={strings.submit_module}
          onClick={() => {
            if (repo.submitModule) {
              os.open(repo.submitModule);
            }
          }}
        />
        <MListItem
          part={true}
          icon={DeleteRounded}
          text={strings.remove}
          onClick={() => {
            ons.notification
              .confirm(
                strings.formatString(strings.confirm_repo_delete, {
                  name: repo.name,
                }) as string
              )
              .then((g) => {
                if (g) {
                  actions.removeRepo({
                    id: repo.id,
                  });
                }
              });
          }}
        />
      </List>
    </React.Fragment>
  );
};
