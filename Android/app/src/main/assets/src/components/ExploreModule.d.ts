import { IconButtonProps } from "@mui/material";
import { PaperProps } from "@mui/material";
interface Props {
    index: number;
    notesUrl: string;
    downloadUrl?: string;
    moduleOptions: any;
    stars?: int;
    last_update?: any;
    fullItem: any;
    getId: any;
    propsUrl: any;
}
export declare const ExploreModule: (props: Props) => import("react/jsx-runtime").JSX.Element;
export declare const StyledCard: (props: PaperProps) => JSX.Element;
export declare const StyledIconButton: (props: IconButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
