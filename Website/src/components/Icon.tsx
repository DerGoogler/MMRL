import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material/SvgIcon";
import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";
import ViewX from "./ViewX";

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

    this.createView = this.createView.bind(this);
  }

  public createView(): JSX.Element {
    const { keepLight, ...rest } = this.props;
    return (
      <this.props.icon
        sx={{
          color: keepLight ? "rgba(255, 255, 255, 1)" : this.isDarkmode ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.54)",
          verticalAlign: "baseline",
        }}
        {...rest}
      />
    );
  }
}

export default Icon;
