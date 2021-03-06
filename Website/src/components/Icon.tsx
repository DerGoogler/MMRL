import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material/SvgIcon";
import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";
import { ViewX, ViewXRenderData } from "react-onsenuix";

interface IProps extends SvgIconProps {
  icon: OverridableComponent<SvgIconTypeMap>;
  /**
   * Keeps the icons in light colors even if it's dark mode on
   */
  keepLight?: boolean;
}

/**
 * An icon wrapper for Material React icons
 */
class Icon extends ViewX<IProps, {}, SVGSVGElement> {
  private pref: ISharedPreferences;
  private isDarkmode: boolean;
  public constructor(props: IProps | Readonly<IProps>) {
    // @ts-ignore
    super(props);
    this.pref = new SharedPreferences();
    this.isDarkmode = this.pref.getBoolean("enableDarkmode_switch", false);
  }

  public createView(data: ViewXRenderData<IProps, {}, SVGSVGElement>): JSX.Element {
    return (
      <this.props.icon
        sx={{ color: this.isDarkmode ? (data.p.keepLight ? "rgba(0, 0, 0, 0.54)" : "rgba(255, 255, 255, 1)") : "rgba(0, 0, 0, 0.54)" }}
        {...data.p}
      />
    );
  }
}

export default Icon;
