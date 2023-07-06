import {
  Add,
  DeleteRounded,
  ExtensionRounded,
  LanguageRounded,
  SupportRounded,
  UploadFileRounded,
  VolunteerActivismRounded,
} from "@mui/icons-material";
import ons from "onsenui";
import Icon from "@Components/Icon";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Switch,
  TextField,
} from "@mui/material";
import AlertDialog from "@Builders/AlertDialog";
import { useRepos } from "@Hooks/useRepos";
import React from "react";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { os } from "@Native/Os";
import { useSettings } from "@Hooks/useSettings";
import { useStrings } from "@Hooks/useStrings";
import { Page } from "@Components/onsenui/Page";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Android12Switch } from "@Components/Android12Switch";

interface ListItemProps {
  part?: any;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: () => void;
}

const RepoActivity = () => {
  const MAX_REPO_LENGTH: number = 5;
  const { context } = useActivity();
  const { settings, setSettings } = useSettings();
  const { strings } = useStrings();

  const { repos, actions } = useRepos();
  const [repoLink, setRepoLink] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRepoLinkChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRepoLink(event.target.value);
  };

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

  const filteredRepos = repos.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings.repositories}</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={Add} onClick={handleClickOpen} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <>
      <Page renderToolbar={renderToolbar}>
        {/* <Searchbar placeholder={string("search_modules")} onButtonClick={() => {}} onInputChange={repoSearchFilter} /> */}

        {filteredRepos.map((repo: StoredRepo, index: number) => (
          <Fragment key={index}>
            <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{repo.name}</ListSubheader>}>
              <ListItem>
                <ListItemIcon>
                  <Icon icon={ExtensionRounded} />
                </ListItemIcon>
                <StyledListItemText id="switch-list-label-eruda" primary="Enabled" />
                <Android12Switch
                  edge="end"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    actions.setRepoEnabled({
                      index: index,
                      state: checked,
                      callback: forceUpdate,
                    });
                  }}
                  checked={repo.isOn}
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
          </Fragment>
        ))}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Repository</DialogTitle>
          <DialogContent>
            <DialogContentText>Add your repository or an repository from some other people</DialogContentText>
            <TextField
              autoFocus
              name="repo_link"
              fullWidth
              margin="dense"
              type="text"
              label={"Modules link"}
              value={repoLink}
              variant="outlined"
              onChange={handleRepoLinkChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                actions.addRepo({
                  url: repoLink,
                  callback: (state) => {
                    setRepoLink("");
                    handleClose();
                  },
                  error: (error) => {
                    setRepoLink("");
                    os.toast(error, Toast.LENGTH_SHORT);
                    handleClose();
                  },
                });
              }}
            >
              Fetch
            </Button>
          </DialogActions>
        </Dialog>
      </Page>
    </>
  );
};

export default RepoActivity;
