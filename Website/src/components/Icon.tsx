import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material/SvgIcon";
import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";
import { Component } from "react";

interface IProps {
  icon: OverridableComponent<SvgIconTypeMap>;
  /**
   * Keeps the icons in light colors even if it's dark mode on
   */
  keepLight?: boolean;
}

/**
 * An icon wrapper for Material React icons
 */
class Icon extends Component<IProps & SvgIconProps> {
  private pref: ISharedPreferences;
  private isDarkmode: boolean;
  public constructor(props: (IProps & SvgIconProps) | Readonly<IProps & SvgIconProps>) {
    super(props);
    this.pref = new SharedPreferences();
    this.isDarkmode = this.pref.getBoolean("enableDarkmode_switch", false);
  }

  public render() {
    const { keepLight } = this.props;
    return (
      <this.props.icon
        sx={{ color: this.isDarkmode ? (keepLight ? "rgba(0, 0, 0, 0.54)" : "rgba(255, 255, 255, 1)") : "rgba(0, 0, 0, 0.54)" }}
        {...this.props}
      />
    );
  }
}

export default Icon;
