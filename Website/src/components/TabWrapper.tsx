import * as React from "react";
import { Page } from "react-onsenui";
import { StyledSection } from "./StyledSection";

interface Props {
  element: React.ElementType;
}

const TabWrapper = (props: Props) => {
  const Element = props.element;
  return (
    <Page>
      <StyledSection>
        <Element />
      </StyledSection>
    </Page>
  );
};

export { TabWrapper };
