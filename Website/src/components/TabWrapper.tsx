import { Page, ViewX, ViewXRenderData } from "react-onsenuix";

interface Props {
  element: JSX.Element;
}

class TabWrapper extends ViewX<Props> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  public createView(data: ViewXRenderData<Props, {}, HTMLElement>): JSX.Element {
    return <Page>{data.p.element}</Page>;
  }
}

export { TabWrapper };
