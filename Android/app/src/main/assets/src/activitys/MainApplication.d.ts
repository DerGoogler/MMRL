interface Props {
    id: string;
    name: string;
    version: string;
    versionCode: int;
    author: string;
    description: string;
    minApi?: int;
    maxApi?: int;
    minMagisk?: int;
    needRamdisk?: boolean;
    support?: string;
    donate?: string;
    config?: string;
    changeBoot?: boolean;
    pushPage: any;
}
declare const MainApplication: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default MainApplication;
