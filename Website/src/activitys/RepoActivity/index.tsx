import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRepos } from "@Hooks/useRepos";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { os } from "@Native/Os";
import { useStrings } from "@Hooks/useStrings";
import { Page } from "@Components/onsenui/Page";
import { RecommendedRepo } from "./components/RecommendedRepo";
import { LocalRepository } from "./components/LocalRepository";
import { useNetwork } from "@Hooks/useNetwork";

const recommended_repos = [
  {
    name: "Magisk Modules Alternative Repository",
    link: "https://gr.dergoogler.com/mmar/",
  },
  {
    name: "Googlers Magisk Repo",
    link: "https://gr.dergoogler.com/gmr/",
  },
  {
    name: "IzzyOnDroid Magisk Repository",
    link: "https://apt.izzysoft.de/magisk/",
  },
  // {
  //   name: "Magisk Modules Repo (Official)",
  //   link: "https://gr.dergoogler.com/mmr/",
  // },
];

const MemoizdRecommendedRepos = React.memo((props) => {
  const { strings } = useStrings();
  const { repos } = useRepos();
  return (
    <>
      {repos.length !== 0 && <Divider />}
      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings("explore_repositories")}</ListSubheader>
        }
      >
        {recommended_repos.map((repo, index) => (
          <RecommendedRepo key={repo.name + "_" + index} name={repo.name} link={repo.link} />
        ))}
      </List>
    </>
  );
});

const RepoActivity = () => {
  const { isNetworkAvailable } = useNetwork();
  const { context } = useActivity();
  const { strings } = useStrings();

  const { repos, actions } = useRepos();
  const [repoLink, setRepoLink] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (isNetworkAvailable) {
      setOpen(true);
    } else {
      os.toast("Please chack your internet connection", Toast.LENGTH_SHORT);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRepoLinkChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRepoLink(event.target.value);
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings("repositories")}</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={Add} onClick={handleClickOpen} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <>
      <Page renderToolbar={renderToolbar}>
        <Page.RelativeContent zeroMargin>
          <List sx={{ bgcolor: "transparent" }}>
            {repos.map((repo, index) => (
              <LocalRepository key={"repo_" + repo.name + "_" + index} repo={repo} />
            ))}
          </List>
          {isNetworkAvailable && <MemoizdRecommendedRepos />}
        </Page.RelativeContent>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{strings("add_repository")}</DialogTitle>
          <DialogContent>
            <DialogContentText>{strings("add_repository_description")}</DialogContentText>
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
            <Button onClick={handleClose}>{strings("cancel")}</Button>
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
                    os.toast(error.message, Toast.LENGTH_SHORT);
                    handleClose();
                  },
                });
              }}
            >
              {strings("add")}
            </Button>
          </DialogActions>
        </Dialog>
      </Page>
    </>
  );
};

export default RepoActivity;
