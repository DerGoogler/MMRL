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
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[util.typeCheck<any>(shadow, "0")],
  }));

  return <StyledImage src={src} {...rest} />;
}

function ImageWithCaption(props: Props) {
  const { src, shadow, caption, title, ...rest } = props;

  const StyledDiv = styled("div")(({ theme }) => ({
    position: "relative",
    // maxWidth: "500px",
    margin: "0 auto",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[util.typeCheck<any>(shadow, "0")],

    "& img": {
      verticalAlign: "middle",
      borderRadius: theme.shape.borderRadius,
    },

    "& div": {
      position: "absolute",
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)" /* Black background with 0.5 opacity */,
      color: "#f1f1f1",
      width: "100%",
      padding: "10px",
      borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    },
  }));

  return (
    <StyledDiv {...rest}>
      <img src={src} alt={title} style={{ width: "100%" }} />
      <div>
        {title && <h3 style={{ margin: 0 }}>{title}</h3>}
        {caption && <p>{caption}</p>}
      </div>
    </StyledDiv>
  );
}

export { Image, ImageWithCaption };