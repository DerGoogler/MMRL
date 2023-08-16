import Icon from "@Components/Icon";
import { StyledListItemText } from "@Components/StyledListItemText";
import { useRepos } from "@Hooks/useRepos";
import { useSettings } from "@Hooks/useSettings";
import { useStrings } from "@Hooks/useStrings";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListSubheader, Stack, Typography } from "@mui/material";
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

import { getDatabase, ref, onValue, query } from "firebase/database";
import { firebaseApp } from "@Util/firebase";

const db = getDatabase(firebaseApp);

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

  const formatLastUpdate = useFormatDate(repo.last_update as string);

  const MListItem = (props: ListItemProps) => {
    return (
      <>
        {props.part && (
          <StyledIconButtonWithText onClick={props.onClick}>
            <Stack spacing={0.8} direction="row" alignItems="center">
              <props.icon sx={{ fontSize: 14 }} />
              {/* <span style={{ fontSize: 14 }}>{props.text}</span> */}
            </Stack>
          </StyledIconButtonWithText>
        )}
      </>
    );
  };

  const [authorData, setAuthorData] = React.useState<any>({});

  React.useEffect(() => {
    console.log(repo);
    if (repo?.mmrlOwner) {
      const dbRef = ref(db, "users/" + repo.mmrlOwner);
      onValue(query(dbRef), (snapshot) => {
        setAuthorData(snapshot.val());
        console.log(snapshot.val());
      });
    } else {
      setAuthorData(undefined);
    }
  }, []);

  return (
    <React.Fragment>
      <StyledCard elevation={0}>
        <Box sx={{ p: 2, display: "flex" }}>
          <Stack spacing={0.5} style={{ flexGrow: 1 }}>
            <Typography fontWeight={700} color="text.primary">
              {repo.name}
            </Typography>{" "}
            <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
              {repo.mmrlOwner ? <span>{authorData.username ? authorData.username : "Unknown owner"}</span> : <span>Unknown owner</span>}
              {authorData?.options?.roles?.verified && <VerifiedIcon sx={{ fontSize: ".70rem" }} />}
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
            inputProps={{
              "aria-labelledby": "switch-list-label-eruda",
            }}
          />

          <Stack spacing={0.8} direction="row">
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
          </Stack>
        </Stack>
      </StyledCard>
    </React.Fragment>
  );
};
