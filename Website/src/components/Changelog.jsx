import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

class Changelog extends React.Component {
  render() {
    const { version, children } = this.props;
    return (
      <>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id={version}>
            <span>{version}</span>
          </AccordionSummary>
          <AccordionDetails>
            <span>{children}</span>
          </AccordionDetails>
        </Accordion>
      </>
    );
  }
}

export default Changelog;
