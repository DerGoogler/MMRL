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
declare const Icon: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export default Icon;
