import { Add } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useRepos } from "@Hooks/useRepos";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { os } from "@Native/Os";
import { useStrings } from "@Hooks/useStrings";
import { Page } from "@Components/onsenui/Page";
import { For } from "@Components/For";
import { RecommendedRepo } from "./components/RecommendedRepo";
import { LocalRepository } from "./components/LocalRepository";

const RepoActivity = () => {
  const MAX_REPO_LENGTH: number = 5;
  const { context } = useActivity();
  const { strings } = useStrings();

  const { repos, actions } = useRepos();
  const [repoLink, setRepoLink] = React.useState("");
  const [search, setSearch] = React.useState("");

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

  const recommended_repos = [
    {
      name: "Magisk Modules Alternative Repository",
      module_count: 100,
      link: "https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json",
    },
    {
      name: "Googlers Magisk Repo",
      module_count: 3,
      link: "https://raw.githubusercontent.com/Googlers-Repo/googlers-repo.github.io/master/modules.json",
    },
  ];

  return (
    <>
      <Page renderToolbar={renderToolbar}>
        <Page.RelativeContent zeroMargin>
          <For
            each={filteredRepos}
            fallback={() => (
              <>
                <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                  Recommended Repos
                </Typography>
                {recommended_repos.map((repo) => (
                  <RecommendedRepo key={"recomm_" + repo.module_count} name={repo.name} moduleCount={repo.module_count} link={repo.link} />
                ))}
              </>
            )}
            catch={(e: Error | undefined) => <Box sx={(theme) => ({ color: theme.palette.text.primary })}>ERROR: {e?.message}</Box>}
            render={(repo, index) => <LocalRepository key={"repo_" + index} repo={repo} />}
          />
        </Page.RelativeContent>
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
