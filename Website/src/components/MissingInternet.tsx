import Stack from "@mui/material/Stack";
import WifiOffOutlinedIcon from "@mui/icons-material/WifiOffOutlined";
import Box from "@mui/material/Box";
import Icon from "./Icon";

export const MissingInternet = () => {
  return (
    <Stack
      component="h4"
      sx={(theme) => ({
        color: theme.palette.secondary.dark,
        width: "100%",
        height: "100%",
        m: "unset",
      })}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Icon
        icon={WifiOffOutlinedIcon}
        sx={{
          fontSize: 160,
        }}
      />
      <Box>Please check your internet connection</Box>
    </Stack>
  );
};
