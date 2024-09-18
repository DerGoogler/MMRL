import { Activities } from "@Activitys/index";
import { Pre } from "@Components/dapi/Pre";
import { useActivity } from "@Hooks/useActivity";
import { useModuleInfo } from "@Hooks/useModuleInfo";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import BugReportIcon from "@mui/icons-material/BugReport";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import GitHubIcon from "@mui/icons-material/GitHub";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, AvatarGroup, Box, Divider, ListSubheader, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { os } from "@Native/Os";
import React from "react";

const preSx = { display: "inline" };

const AboutTab = () => {
  const { strings } = useStrings();
  const { context, extra } = useActivity<Module>();
  const { theme } = useTheme();

  const { track, features } = extra;
  const { license, verified, support } = useModuleInfo(extra);

  return (
    <>
      <List>
        {verified && (
          <ListItem>
            <ListItemIcon>
              <VerifiedIcon />
            </ListItemIcon>
            <ListItemText primary={strings("verified_module")} secondary={strings("verified_module_desc")} />
          </ListItem>
        )}

        {license && (
          <ListItemButton
            onClick={() => {
              fetch(`https://raw.githubusercontent.com/spdx/license-list-data/main/website/${license}.json`)
                .then((res) => {
                  if (res.status === 200) {
                    return res.json();
                  } else {
                    throw new Error("Fetching license failed");
                  }
                })
                .then((json: LicenseSPX) => {
                  context.pushPage({
                    component: Activities.FetchText,
                    key: "license_" + license,
                    extra: {
                      raw_data: json.licenseText,
                      modulename: json.name,
                    },
                  });
                })
                .catch((err) => {});
            }}
          >
            <ListItemIcon>
              <FormatAlignLeftIcon />
            </ListItemIcon>
            <ListItemText primary={strings("license")} secondary={license} />
          </ListItemButton>
        )}

        {support && (
          <ListItemButton
            onClick={() => {
              os.open(support, {
                target: "_blank",
                features: {
                  color: theme.palette.primary.main,
                },
              });
            }}
          >
            <ListItemIcon>
              <BugReportIcon />
            </ListItemIcon>
            <ListItemText primary="Issues" secondary={support} />
          </ListItemButton>
        )}

        <ListItemButton
          onClick={() => {
            os.open(track.source, {
              target: "_blank",
              features: {
                color: theme.palette.primary.main,
              },
            });
          }}
        >
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary={strings("source")} secondary={track.source} />
        </ListItemButton>
      </List>

      {features && Object.keys(features).length !== 0 && (
        <>
          <Divider />

          <List subheader={<ListSubheader>{strings("features")}</ListSubheader>}>
            <FeatureItem
              feat={features?.service}
              title="Late Service"
              desc={
                <>
                  This module contains the file <Pre sx={preSx}>service.sh</Pre>. This file will be executed in late_start service.
                </>
              }
            />
            <FeatureItem
              feat={features?.post_fs_data}
              title="Post service"
              desc={
                <>
                  This module contains the file <Pre sx={preSx}>post-fs-data.sh</Pre>. This file will be executed in post-fs-data.
                </>
              }
            />
            <FeatureItem
              feat={features?.resetprop}
              title="System properties"
              desc={
                <>
                  This module will manipulate system properties with <Pre sx={preSx}>resetprop</Pre>
                </>
              }
            />
            <FeatureItem feat={features?.sepolicy} title="SELinux Policy" desc="This module has additional custom sepolicy rules" />
            <FeatureItem feat={features?.zygisk} title="Zygisk module" desc="This module requires Zygisk to be enabled." />

            <FeatureItem
              feat={features?.webroot}
              title="WebUI"
              desc="This module contains WebUI files that can be used with the KernelSU Manager."
              icons={["assets/KernelSULogo.png"]}
            />
            <FeatureItem
              feat={features?.post_mount}
              title="Post mount"
              desc={
                <>
                  This module contains the file <Pre sx={preSx}>post-mount.sh</Pre>. This file will be executed in post-mount.
                </>
              }
              icons={["assets/KernelSULogo.png", "assets/APatchSULogo.png"]}
            />
            <FeatureItem
              feat={features?.boot_completed}
              title="Boot completed script"
              desc={
                <>
                  This module contains the file <Pre sx={preSx}>boot-completed.sh</Pre>. This file will be executed when the boot is
                  completed.
                </>
              }
              icons={["assets/KernelSULogo.png", "assets/APatchSULogo.png"]}
            />

            <FeatureItem feat={features?.modconf} title="ModConf" desc="This module contains ModConf files that can be used with MMRL." />
            <FeatureItem
              feat={features?.apks}
              title="Contains APKs"
              desc="This module may contains APKs that sometimes do not have publicly available source code."
            />
          </List>
        </>
      )}
    </>
  );
};

interface FeatureItemProps {
  feat: boolean | undefined;
  title: React.ReactNode;
  icons?: string[];
  desc: React.ReactNode;
}

const FeatureItem = React.memo<FeatureItemProps>(({ feat, title, desc, icons }) => {
  if (feat) {
    return (
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
              <Typography sx={{ fontSize: "unset" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center", whiteSpace: "normal" }}>
                  {icons && Array.isArray(icons) ? (
                    <>
                      <AvatarGroup sx={{ mr: 1 }}>
                        {icons.map((icon) => (
                          <Avatar sx={{ borderRadius: "unset", width: "1rem", height: "1rem" }} src={icon} />
                        ))}
                      </AvatarGroup>
                    </>
                  ) : (
                    icons && <Avatar sx={{ borderRadius: "unset", mr: 1, width: "1rem", height: "1rem" }} src={icons} />
                  )}
                  {title}
                </Box>
              </Typography>
            </Stack>
          }
          secondary={desc}
        />
      </ListItem>
    );
  }
});

export { AboutTab };

