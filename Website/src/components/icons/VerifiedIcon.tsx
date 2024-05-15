import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import { Tooltip, SvgIcon } from "@mui/material";
import { useId } from "react";

interface VerifiedIconProps {
  isVerified?: boolean;
}

const VerifiedIcon = (props: VerifiedIconProps) => {
  const { isVerified } = props;

  const { strings } = useStrings();
  const { theme } = useTheme();

  const verifiedId = useId();

  if (isVerified) {
    return (
      <Tooltip title={strings("verified_module")} placement="right" arrow>
        <SvgIcon sx={{ fontSize: "unset" }}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" opacity="1">
            <defs>
              <linearGradient gradientTransform="rotate(140, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id={`${verifiedId}-gradient`}>
                <stop stopColor="hsl(298.13deg 97.96% 38.43%)" stopOpacity="1" offset="0%" />
                <stop stopColor="hsl(267deg 75% 31.37%)" stopOpacity="1" offset="100%" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${verifiedId}-gradient) ${theme.palette.text.link}`}
              filter={`url(#${verifiedId}-filter)`}
              d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48z"
            />
          </svg>
        </SvgIcon>
      </Tooltip>
    );
  } else {
    return null;
  }
};

export { VerifiedIcon };
