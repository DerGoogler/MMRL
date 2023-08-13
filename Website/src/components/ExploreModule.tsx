import { Alert, AlertTitle, Box, CardMedia, Chip, Divider, Stack, Typography } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { VerifiedRounded } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { os } from "@Native/Os";
import { StyledCard } from "./StyledCard";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";
import { StyledIconButton, StyledIconButtonWithText } from "./StyledIconButton";
import { useSettings } from "@Hooks/useSettings";
import { isMobile } from "react-device-detect";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useModuleOptions } from "@Hooks/useModuleOptions";
import { GestureDetector } from "./onsenui/GestureDetector";

import { getDatabase, set, ref, update, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@Util/firebase";
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

interface Props {
  index: number;
  moduleProps: Module;
}
export const ExploreModule = (props: Props) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();

  const { id, notes_url, zip_url, last_update, prop_url } = props.moduleProps;

  const { isVerified, isHidden } = useModuleOptions(id);
  const isLowQuality = useLowQualityModule(prop_url);
  const formatLastUpdate = useFormatDate(last_update);

  if (isHidden) {
    return null;
  }

  const handleOpen = () => {
    context.pushPage<any>({
      component: DescriptonActivity,

      props: {
        key: `view_${prop_url.id}`,
        extra: {
          param: {
            name: "module",
            value: prop_url.id,
          },
          title: prop_url.name,
          prop_url: prop_url,
          zip_url: zip_url,
          request: {
            url: notes_url,
          },
        },
      },
    });
  };

  return (
    <StyledCard elevation={0}>
      <GestureDetector
        onTap={handleOpen}
        onHold={() => {
          os.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        }}
      >
        {!settings._disable_module_covers && prop_url.mmrlCover && (
          // @ts-ignore
          <CardMedia
            component="img"
            style={{
              minHeight: os.isAndroid || isMobile ? 179 : 465,
              height: "100%",
              objectFit: "cover",
            }}
            image={prop_url.mmrlCover}
            alt={prop_url.name}
          />
        )}
        <Box sx={{ p: 2, display: "flex" }}>
          <Stack spacing={0.5} style={{ flexGrow: 1 }}>
            <Typography fontWeight={700} color="text.primary">
              {prop_url.name}
            </Typography>{" "}
            <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
              {prop_url.version} ({prop_url.versionCode}) / {prop_url.author}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {prop_url.description}
            </Typography>
          </Stack>
        </Box>
      </GestureDetector>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Chip
          size="small"
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.light,
          })}
          label={formatLastUpdate}
        />
        <Stack spacing={0.8} direction="row">
          {/* <StyledIconButtonWithText
            onClick={() => {
              set(ref(db, `modules/${prop_url.id}/likes/${auth.currentUser.uid}`), true);
            }}
          >
            <Stack spacing={0.8} direction="row" alignItems="center">
              <ThumbUpIcon sx={{ fontSize: 14 }} />
              <span style={{ fontSize: 14 }}>0</span>
            </Stack>
          </StyledIconButtonWithText> */}
          {isVerified && (
            <StyledIconButton
              style={{ width: 39, height: 39 }}
              onClick={() => {
                os.toast(strings.module_verified, Toast.LENGTH_SHORT);
              }}
            >
              <VerifiedRounded sx={{ fontSize: 14 }} />
            </StyledIconButton>
          )}
        </Stack>
      </Stack>
      {settings._low_quality_module && isLowQuality && (
        <Alert style={{ borderRadius: 0 }} severity="warning">
          <AlertTitle>Low Quality</AlertTitle>
          Module meets not the requirements of its props
        </Alert>
      )}
    </StyledCard>
  );
};
