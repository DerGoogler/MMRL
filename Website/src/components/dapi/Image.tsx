import PicturePreviewActivity from "@Activitys/PicturePreviewActivity";
import { useActivity } from "@Hooks/useActivity";
import { useTheme } from "@Hooks/useTheme";
import { Box, BoxProps } from "@mui/material";
import { util } from "googlers-tools";

type Props = BoxProps<"img", JSX.IntrinsicElements["img"]> & {
  shadow?: string;
  title?: string;
  caption?: string;
  noOpen?: boolean;
};

function Image(props: Props) {
  const { theme } = useTheme();
  const { context } = useActivity();
  const { src, shadow, noOpen, ...rest } = props;

  return (
    <Box
      component="img"
      sx={{
        ":hover": {
          cursor: !noOpen ? "pointer" : "unset",
        },
        borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider} !important`,
        boxShadow: theme.shadows[shadow || 0],
      }}
      src={src}
      onClick={() => {
        if (!noOpen) {
          context.pushPage({
            component: PicturePreviewActivity,
            key: "PicturePreviewActivity",
            extra: {
              picture: src,
            },
          });
        }
      }}
      {...rest}
    />
  );
}

export { Image };
