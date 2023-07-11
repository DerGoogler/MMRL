import * as React from "react";
import { Page } from "react-onsenui";
import { RelativeStyledSection } from "./StyledSection";

interface Props {
  element: React.ElementType;
  renderFixed?(): void;
}

const TabWrapper = (props: Props) => {
  const Element = props.element;
  return (
    <Page renderFixed={props.renderFixed}>
      <RelativeStyledSection>
        <Element />
      </RelativeStyledSection>
    </Page>
  );
};

export { TabWrapper };
