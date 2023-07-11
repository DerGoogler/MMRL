import { Theme, styled } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

interface StyledSectionProps {
  /**
   * This property affects only small screens
   */
  zeroMargin?: boolean;
}

interface IntrinsicElements extends Omit<React.JSX.IntrinsicElements, "section"> {
  section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & StyledSectionProps, HTMLElement>;
}
// <React.JSX.IntrinsicElements["section"], {}>
export const StyledSection = styled<keyof IntrinsicElements>("section")((props: StyledSectionProps) => ({
  display: "flex",
  flexDirection: "column",
  margin: props.zeroMargin ? 0 : 8,
}));

export const RelativeStyledSection = styled(StyledSection)((props: StyledSectionProps) => {
  const matches = useMediaQuery("(max-width: 767px)");

  return {
    boxSizing: "border-box",
    minWidth: "200px",
    maxWidth: "980px",
    margin: "0 auto",
    ...(matches ? { padding: props.zeroMargin ? 0 : 8 } : { padding: 45 }),
  };
});
