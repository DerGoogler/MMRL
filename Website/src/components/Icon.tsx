import { useSettings } from "@Hooks/useSettings";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material/SvgIcon";

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
const Icon = (props: IProps) => {
  const { settings } = useSettings();

  const { keepLight, ...rest } = props;
  return (
    <props.icon
      sx={{
        color: keepLight ? "rgba(255, 255, 255, 1)" : settings.darkmode ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.54)",
        verticalAlign: "baseline",
      }}
      {...rest}
    />
  );
};

export default Icon;
