import PicturePreviewActivity from "@Activitys/PicturePreviewActivity";
import { useActivity } from "@Hooks/useActivity";
import { ModFS, useModFS } from "@Hooks/useModFS";
import { useTheme } from "@Hooks/useTheme";
import { SuFile } from "@Native/SuFile";
import { formatString } from "@Util/stringFormat";
import { Box, BoxProps, SxProps } from "@mui/material";
import React from "react";

type Props = BoxProps<"img", JSX.IntrinsicElements["img"]> & {
  type?: string;
  shadow?: string;
  title?: string;
  caption?: string;
  noOpen?: boolean;
  modFSAdds?: Partial<ModFS>;
};

function Image(props: Props) {
  const { theme } = useTheme();
  const { _modFS } = useModFS();
  const { context } = useActivity();
  const { type = "image/png", src, shadow, noOpen, sx, modFSAdds, ...rest } = props;

  const [newSrc, setNewSrc] = React.useState(src);

  React.useEffect(() => {
    if (src) {
      const file = new SuFile(formatString(src, { ..._modFS, ...modFSAdds }));
      if (file.exist()) {
        setNewSrc(`data:${type};base64,${file.readAsBase64()}`);
      }
    }
  }, [src]);

  return (
    <Box
      component={"img"}
      sx={{
        ":hover": {
          cursor: !noOpen ? "pointer" : "unset",
        },
        borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider} !important`,
        boxShadow: theme.shadows[shadow || 0],
        ...sx,
      }}
      src={newSrc}
      onClick={() => {
        if (!noOpen) {
          context.pushPage({
            component: PicturePreviewActivity,
            key: "PicturePreviewActivity",
            extra: {
              picture: newSrc,
            },
          });
        }
      }}
      {...rest}
    />
  );
}

export { Image };
