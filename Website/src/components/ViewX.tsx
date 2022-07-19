import React from "react";

type ViewXTypeProps<P = {}, E = HTMLElement> = React.HTMLAttributes<E> & P;

abstract class ViewX<P = {}, S = {}, E = HTMLElement, SS = any> extends React.Component<ViewXTypeProps<P, E>, S, SS> {
  public constructor(props: ViewXTypeProps<P, E> | Readonly<ViewXTypeProps<P, E>>) {
    super(props);

    this.createView = this.createView.bind(this);
  }

  /**
   * Normal method to render
   */
  public createView(): JSX.Element {
    return <></>;
  }

  /**
   * @deprecated
   */
  public render(): React.ReactNode {
    return <this.createView />;
  }
}

export default ViewX;
