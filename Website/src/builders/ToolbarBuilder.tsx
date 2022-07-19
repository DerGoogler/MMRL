import { Component } from "react";
import { BackButton, Toolbar } from "react-onsenui";

interface Props {
  /**
   * It's used to display a title on the toolbar
   */
  title: string;
  /**
   * Due not use it with `addToolbarButton="left"`!
   *
   * Remove the `onBackButton` attr or put `false` inside!
   */
  onBackButton?: boolean;
  addToolbarButton?: React.ReactNode;
  addToolbarButtonPosition?: "left" | "right";
  modifier?: string;
}

export class ToolbarBuilder extends Component<Props> {
  public render() {
    const { title, onBackButton, addToolbarButton, addToolbarButtonPosition, modifier } = this.props;
    return (
      <Toolbar modifier={modifier}>
        <div className="left">
          {/**
              // @ts-ignore */}
          {onBackButton ? <BackButton onClick={onBackButton} /> : null}
          {addToolbarButtonPosition === "left" ? addToolbarButton : null}
        </div>
        <div className="center drag--windows">{title}</div>
        <div className="right">{addToolbarButtonPosition === "right" ? addToolbarButton : null}</div>
      </Toolbar>
    );
  }
}

export default ToolbarBuilder;
