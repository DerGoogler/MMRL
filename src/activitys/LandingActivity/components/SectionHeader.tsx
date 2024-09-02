import { styled, Typography } from "@mui/material";

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    fontSize: "25px",
  },

  fontSize: "1.5rem",
  textAlign: "center",
}));

export { SectionHeader };
