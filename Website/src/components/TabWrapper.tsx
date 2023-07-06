import * as React from "react";
import { Page } from "react-onsenui";
import { StyledSection } from "./StyledSection";

interface Props {
  element: React.ElementType;
  props: any;
}

const TabWrapper = (props: Props) => {
  const Element = props.element;
  return (
    <Page>
      <StyledSection>
        <Element {...props} />
      </StyledSection>
    </Page>
  );
};

export { TabWrapper };
