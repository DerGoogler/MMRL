import { styled } from "@mui/material";
import { util } from "googlers-tools";

type Props = JSX.IntrinsicElements["img"] & {
  shadow?: string;
  title?: string;
  caption?: string;
};

function Image(props: Props) {
  const { src, shadow, ...rest } = props;

  const StyledImage = styled("img")(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[util.typeCheck<any>(shadow, "0")],
  }));

  return <StyledImage src={src} {...rest} />;
}

export { Image };
