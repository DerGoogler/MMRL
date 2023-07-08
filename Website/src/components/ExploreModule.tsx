import { Box, Chip, Divider, Stack, Typography, IconButton, IconButtonProps } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import DescriptionIcon from "@mui/icons-material/Description";
import { Paper, PaperProps, styled } from "@mui/material";
import { useSettings, useTheme } from "@Hooks/useSettings";
import useShadeColor from "@Hooks/useShadeColor";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { VerifiedRounded } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { os } from "@Native/Os";
import { StyledCard } from "./StyledCard";
import { StyledIconButton } from "./StyledIconButton";

interface Props {
  index: number;
  notesUrl: string;
  downloadUrl?: string;
  moduleOptions: any;
  stars?: int;
  last_update?: any;
  fullItem: any;
  getId: any;
  propsUrl: any;
}
export const ExploreModule = (props: Props) => {
  const { context } = useActivity();
  const { strings } = useStrings();

  const { notesUrl, downloadUrl, moduleOptions, stars, last_update, getId, fullItem, propsUrl, index } = props;
  const isVerified = moduleOptions[getId]?.verified;
  const _display = moduleOptions[getId]?.display;

  const formatDate = (date: Date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // @ts-ignore
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  };

  const handleOpen = () => {
    context.pushPage<any>({
      component: DescriptonActivity,
      props: {
        key: `view_${propsUrl.id}`,
        extra: {
          title: propsUrl.name,
          request: {
            use: true,
            url: notesUrl,
          },
        },
      },
    });
  };

  const handleDownload = () => {
    os.open(downloadUrl);
  };

  return (
    <StyledCard elevation={0}>
      <Box sx={{ p: 2, display: "flex" }}>
        <Stack spacing={0.5} style={{ flexGrow: 1 }}>
          <Typography fontWeight={700} color="text.primary">
            {propsUrl.name}
          </Typography>{" "}
          <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
            {propsUrl.version} ({propsUrl.versionCode}) / {propsUrl.author}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {propsUrl.description}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Chip
          size="small"
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.light,
          })}
          label={formatDate(new Date(last_update))}
        />
        <Stack spacing={0.8} direction="row">
          {isVerified && (
            <StyledIconButton
              style={{ width: 30, height: 30 }}
              onClick={() => {
                os.toast(strings.module_verified, Toast.LENGTH_SHORT);
              }}
            >
              <VerifiedRounded sx={{ fontSize: 14 }} />
            </StyledIconButton>
          )}

          <StyledIconButton style={{ width: 30, height: 30 }} onClick={handleOpen}>
            <DescriptionIcon sx={{ fontSize: 14 }} />
          </StyledIconButton>

          <StyledIconButton style={{ width: 30, height: 30 }} onClick={handleDownload}>
            <FileDownloadIcon sx={{ fontSize: 14 }} />
          </StyledIconButton>
        </Stack>
      </Stack>
    </StyledCard>
  );
};