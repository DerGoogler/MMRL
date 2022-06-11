import { Component } from "react";
import { BackButton, Toolbar } from "react-onsenui";

export interface Props {
  title: string;
  /**
   * Due not use it with `addToolbarButton="left"`!
   *
   * Remove the `onBackButton` attr or put `false` inside!
   */
  onBackButton?: boolean;
  addToolbarButton?: React.ReactNode;
  addToolbarButtonPosition?: "left" | "right";
}

class ToolbarBuilder extends Component<Props> {
  public render() {
    const { title, onBackButton, addToolbarButton, addToolbarButtonPosition } = this.props;
    return (
      <Toolbar>
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
