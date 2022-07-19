import { Page } from "react-onsenui";
import ViewX from "./ViewX";

interface Props {
  element: React.ElementType;
  props: any;
}

class TabWrapper extends ViewX<Props> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  public createView(): JSX.Element {
    const Element = this.props.element;
    const props = this.props.props;
    return (
      <Page>
        <Element {...props} />
      </Page>
    );
  }
}

export { TabWrapper };
