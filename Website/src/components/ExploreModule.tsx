import { Alert, AlertTitle, Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { VerifiedRounded } from "@mui/icons-material";
import { os } from "@Native/Os";
import { StyledCard } from "./StyledCard";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";
import { StyledIconButton } from "./StyledIconButton";
import { useSettings } from "@Hooks/useSettings";

interface Props {
  index: number;
  moduleProps: Module;
  moduleOptions: any;
}
export const ExploreModule = (props: Props) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();

  const { moduleOptions, index } = props;
  const { id, notes_url, zip_url, last_update, prop_url } = props.moduleProps;

  // Create better handler
  const isVerified = moduleOptions[id]?.verified;
  const _display = moduleOptions[id]?.display;

  const isLowQuality = useLowQualityModule(prop_url);

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
        key: `view_${prop_url.id}`,
        extra: {
          param: {
            name: "module",
            value: prop_url.id,
          },
          title: prop_url.name,
          prop_url: prop_url,
          module_options: props.moduleOptions,
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
      <Box sx={{ p: 2, display: "flex" }}>
        <Stack spacing={0.5} style={{ flexGrow: 1 }} onClick={handleOpen}>
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
