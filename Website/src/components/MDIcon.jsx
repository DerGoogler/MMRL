import * as React from "react";
import tools from "@Utils/tools";

class MDIcon extends React.Component {
  render() {
    const { icon, size, disabled, isInList, isInToolbar, theme, style } = this.props;
    return (
      <span>
        <span
          className={
            "material-icons-round " +
            tools.typeIF(isInList, "list-item__icon", "") +
            " ons-icon " +
            "material-icons md-" +
            size +
            " md-" +
            theme +
            " " +
            tools.typeIF(disabled, "md-inactive ", "")
          }
          style={{
            textAlign: "center",
            height: tools.typeIF(isInToolbar, "56px", "100%"),
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            ...style,
          }}
        >
          {icon}
        </span>
      </span>
    );
  }
}

export default MDIcon;
