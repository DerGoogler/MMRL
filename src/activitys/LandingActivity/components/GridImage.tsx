import { Image } from "@Components/dapi/Image";
import { useTheme } from "@Hooks/useTheme";
import { alpha } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

interface GridImageProps {
  src?: string;
  alt?: string;
}

const GridImage = (props: GridImageProps) => {
  const { theme } = useTheme();

  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={4}
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
          borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
          outlineOffset: -1,
          outline: `1px solid ${theme.palette.divider} !important`,
        }}
      >
        <Image
          noOutline
          alt={props.alt}
          src={props.src}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
          }}
        />
      </Card>
    </Grid>
  );
};

export { GridImage, GridImageProps };
