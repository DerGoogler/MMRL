import { Alert, AlertTitle, Box, CardMedia, Chip, Divider, Stack, Typography } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { VerifiedRounded } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import { os } from "@Native/Os";
import { StyledCard } from "./StyledCard";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";
import { StyledIconButton, StyledIconButtonWithText } from "./StyledIconButton";
import { useSettings } from "@Hooks/useSettings";
import { isMobile } from "react-device-detect";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useModuleOptions } from "@Hooks/useModuleOptions";
import { GestureDetector } from "./onsenui/GestureDetector";
import { ref, onValue, query } from "firebase/database";
import React from "react";
import { useFirebase } from "@Hooks/useFirebase";

interface Props {
  index: number;
  moduleProps: Module;
  disableLowQuality?: boolean;
  disableCovers?: boolean;
}
export const ExploreModule = (props: Props) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { auth, firebaseVoid } = useFirebase();

  const { id, notes_url, zip_url, last_update, prop_url } = props.moduleProps;

  const { isVerified, isHidden } = useModuleOptions(id);
  const isLowQuality = useLowQualityModule(prop_url, props.disableLowQuality);
  const formatLastUpdate = useFormatDate(last_update);

  if (isHidden) {
    return null;
  }

  const [authorData, setAuthorData] = React.useState<any>({});

  React.useEffect(() => {
    if (prop_url?.mmrlAuthor) {
      firebaseVoid((auth, db) => {
        const dbRef = ref(db, "users/" + prop_url.mmrlAuthor);
        onValue(query(dbRef), (snapshot) => {
          setAuthorData(snapshot.val());
        });
      });
    } else {
      setAuthorData(undefined);
    }
  }, []);

  const handleOpen = () => {
    context.pushPage<any>({
      component: DescriptonActivity,

      props: {
        key: `view_${prop_url.id}`,
        extra: {
          // param: {
          //   name: "module",
          //   value: prop_url.id,
          // },
          title: prop_url.name,
          prop_url: prop_url,
          zip_url: zip_url,
          authorData: authorData,
          request: {
            url: notes_url,
          },
        },
      },
    });
  };

  const CoverHandler = () => {
    if (props.disableCovers) {
      return null;
    }

    if (!settings._disable_module_covers && prop_url.mmrlCover) {
      return (
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
      );
    }

    return null;
  };

  const LegacyVerified = () => {
    if (!authorData?.options?.roles?.verified && isVerified) {
      return (
        <StyledIconButton
          style={{ width: 39, height: 39 }}
          onClick={() => {
            os.toast(strings.module_verified, Toast.LENGTH_SHORT);
          }}
        >
          <VerifiedRounded sx={{ fontSize: 14 }} />
        </StyledIconButton>
      );
    }

    return null;
  };

  return (
    <StyledCard elevation={0}>
      <Box
        component={GestureDetector}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
        onTap={handleOpen}
        onHold={() => {
          os.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        }}
      >
        <CoverHandler />
        <Box sx={{ p: 2, display: "flex" }}>
          <Stack spacing={0.5} style={{ flexGrow: 1 }}>
            <Typography fontWeight={700} color="text.primary">
              {prop_url.name}
            </Typography>{" "}
            <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                <span>
                  {prop_url.version} ({prop_url.versionCode}) /
                </span>
                {prop_url.mmrlAuthor && authorData ? (
                  <span>{authorData.username ? authorData.username : prop_url.author}</span>
                ) : (
                  <span>{prop_url.author}</span>
                )}
                {authorData?.options?.roles?.verified && <VerifiedIcon sx={{ fontSize: ".70rem" }} />}
              </Stack>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {prop_url.description}
            </Typography>
          </Stack>
        </Box>
      </Box>
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
          <LegacyVerified />
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
