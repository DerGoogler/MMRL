import { Component } from "react";
import { BackButton, Toolbar } from "react-onsenui";

export interface ToolbarBuilderProps {
  /**
   * It's used to display a title on the toolbar
   */
  title: string | JSX.Element;
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

const ToolbarBuilder = (props: ToolbarBuilderProps) => {
  const { title, onBackButton, addToolbarButton, addToolbarButtonPosition, modifier } = props;
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
};

export default ToolbarBuilder;
