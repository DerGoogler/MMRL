import { Avatar, Box, CircularProgress, SxProps, Typography, TypographyProps } from "@mui/material";
import React from "react";

interface AvatarWithProgressProps extends React.PropsWithChildren {
  value: number;
  src?: string;
  sx?: SxProps<MMRLTheme>;
  alt?: string;
  progressTextVariant?: TypographyProps["variant"];
}

const AvatarWithProgress = (props: AvatarWithProgressProps) => {
  const isActive = React.useMemo(() => props.value > 0, [props.value]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        borderRadius: "20%",
        // overflow: "hidden",
        // @ts-ignore
        ...props.sx["& container"],
      }}
    >
      <Avatar src={props.src} sx={props.sx} alt={props.alt} children={props.children} />
      {isActive && (
        <>
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.palette.background.paper,
              opacity: isActive ? 0.6 : 0,
              zIndex: 0,
              // @ts-ignore
              borderRadius: props.sx.borderRadius,
            })}
          />

          <CircularProgress
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: "auto",
              zIndex: 1,
            }}
            variant="determinate"
            value={props.value}
            size={87}
            thickness={1.8}
          />
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
            variant={props.progressTextVariant || "caption"}
          >{`${Math.round(props.value)}%`}</Typography>
        </>
      )}
    </Box>
  );
};

export { AvatarWithProgress };
