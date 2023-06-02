import * as React from "react";
import { Page } from "react-onsenui";

interface Props {
  element: React.ElementType;
  props: any;
}

const TabWrapper = (props: Props) => {
  const Element = props.element;
  return (
    <Page>
      <Element {...props} />
    </Page>
  );
};

export { TabWrapper };
