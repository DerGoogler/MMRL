import { useTheme } from "@Hooks/useTheme";
import { alpha } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface GridCardProps {
  title?: string;
  description?: string;
}

const GridCard = (props: GridCardProps) => {
  const { theme } = useTheme();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={5}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          p: 2,
          height: "100%",
          backgroundImage: "none",
          backgroundColor: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: "saturate(180%) blur(20px)",
          outlineOffset: -1,
          outline: `1px solid ${theme.palette.divider} !important`,
        }}
      >
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{props.title}</Typography>
        <Typography variant="body2">{props.description}</Typography>
      </Card>
    </Grid>
  );
};

export { GridCard, GridCardProps };
