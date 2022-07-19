type Color = `#${string}`;

interface Md3SwitchStyles {
  bgColor: Color;
  thumbColor: Color;
  checkedThumbColor: Color;
  checkedBgColor: Color;
}

export function Md3Switch(sx: Md3SwitchStyles): any {
  return {
    ".switch--material3": {
      width: "36px",
      height: "24px",
      padding: "0 10px",
      minWidth: "36px",
    },
    ".switch--material3__input": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      verticalAlign: "top",
      outline: "none",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      appearance: "none",
      zIndex: "0",
    },
    ":checked + .switch--material__toggle": {
      boxShadow: "none",
      backgroundColor: sx.checkedBgColor,
    },
    ".switch--material3__toggle": {
      backgroundColor: sx.bgColor,
      marginTop: "2px",
      height: "20px",
      boxShadow: "none",
    },
    ".switch--material3__handle": {
      backgroundColor: sx.thumbColor,
      left: "0",
      marginTop: "0.3px",
      width: "15px",
      height: "15px",
      boxShadow: "none",
      marginLeft: "3px",
    },
    ":checked + .switch--material3__toggle > .switch--material3__handle": {
      left: "15px",
      backgroundColor: sx.checkedThumbColor,
      boxShadow: "none",
    },
  };
}
