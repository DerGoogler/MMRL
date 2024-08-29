import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material/SvgIcon";

interface IProps extends SvgIconProps {
  icon: OverridableComponent<SvgIconTypeMap>;
  /**
   * Keeps the icons in light colors even if it's dark mode on
   */
  keepLight?: boolean;

  [key: string]: any;
}

/**
 * An icon wrapper for Material React icons
 */
const Icon = (props: IProps) => {
  const { keepLight, icon: WarpperIcon, ...rest } = props;
  return (
    <WarpperIcon
      sx={{
        color: keepLight ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.54)",
        verticalAlign: "baseline",
      }}
      {...rest}
    />
  );
};

export default Icon;
