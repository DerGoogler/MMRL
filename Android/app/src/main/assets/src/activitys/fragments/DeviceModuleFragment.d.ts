import { Component } from "react";
interface Props {
    pushPage(...arg: any): PushPropsCore;
}
interface States {
    modules: any;
}
declare class DeviceModuleFragment extends Component<Props, States> {
    constructor(props: Props | Readonly<Props>);
    componentDidMount: () => void;
    render: () => import("react/jsx-runtime").JSX.Element;
}
export default DeviceModuleFragment;
