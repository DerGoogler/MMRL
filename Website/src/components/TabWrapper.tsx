import * as React from "react";
import { Page, RenderFunction } from "./onsenui/Page";

interface Props {
  element: React.ElementType;
  renderFixed?: RenderFunction;
}

const TabWrapper = (props: Props) => {
  const Element = props.element;
  return (
    <Page renderFixed={props.renderFixed}>
      <Page.RelativeContent>
        <Element />
      </Page.RelativeContent>
    </Page>
  );
};

export { TabWrapper };
