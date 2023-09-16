import Icon from "@Components/Icon";
import { StyledListItemText } from "@Components/StyledListItemText";
import { useRepos } from "@Hooks/useRepos";
import { useSettings } from "@Hooks/useSettings";
import { useStrings } from "@Hooks/useStrings";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import VerifiedIcon from "@mui/icons-material/Verified";
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
import { StyledIconButton, StyledIconButtonWithText } from "@Components/StyledIconButton";
import { StyledCard } from "@Components/StyledCard";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useConfirm } from "material-ui-confirm";
import { useTheme } from "@Hooks/useTheme";
import CloseIcon from "@mui/icons-material/Close";
import useShadeColor from "@Hooks/useShadeColor";

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
  const confirm = useConfirm();
  const { actions } = useRepos();
  const [enabled, setEnabled] = React.useState(!settings.disabled_repos.includes(repo.id));
  const { theme, scheme } = useTheme();
  const shade = useShadeColor();

  const formatLastUpdate = useFormatDate(repo.last_update as string);

  const MListItem = (props: ListItemProps) => {
    return (
      <>
        {props.part && (
          <ListItemButton onClick={props.onClick}>
            <ListItemIcon>
              <props.icon />
            </ListItemIcon>
            <StyledListItemText primary={props.text} />
          </ListItemButton>
        )}
      </>
    );
  };

  const [authorData, setAuthorData] = React.useState<any>({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Card
        variant="outlined"
        sx={{
          width: "100%",
        }}
      >
        <Box sx={{ p: 2, display: "flex" }}>
          <Stack spacing={0.5} style={{ flexGrow: 1 }}>
            <Typography fontWeight={700} color="text.primary">
              {repo.name}
            </Typography>{" "}
            <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
              <span>Unknown owner</span>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {formatLastUpdate}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
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
          />

          <Stack spacing={0.8} direction="row">
            <Button onClick={handleClickOpen} variant="text">
              More
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {repo.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
            porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <List component="nav" subheader={<ListSubheader sx={{ bgcolor: "transparent" }}>About this repo</ListSubheader>}>
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
                confirm({
                  title: "Delete?",
                  confirmationText: "Sure",
                  description: strings.formatString(strings.confirm_repo_delete, {
                    name: repo.name,
                  }),
                }).then(() => {
                  actions.removeRepo({
                    id: repo.id,
                  });
                });
              }}
            />
          </List>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
