import * as React from "react";
import { alpha, styled, SxProps } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Markup } from "@Components/Markdown";
import { Box } from "@mui/material";

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,

  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  backdropFilter: "saturate(180%) blur(20px)",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:last-child": {
    borderRadius: "0px 0px 8px 8px",
  },
  "&:first-child": {
    borderRadius: "8px 8px 0px 0px",
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: "none",

  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "none",
}));

interface FAQItem {
  q: string;
  a: string;
}
interface FAQProps {
  items: FAQItem[];
  sx?: SxProps;
}

const FAQ = (props: FAQProps) => {
  const [expanded, setExpanded] = React.useState<number | false>(0);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={props.sx}>
      {props.items.map((item, index) => (
        <Accordion expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{item.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={Markup}>{item.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export { FAQ };
