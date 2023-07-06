import React from "react";
interface Props {
    item: any;
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    moduleOptions: Array<any>;
}
declare const FeaturedModulesHeader: ({ item, index, setIndex, moduleOptions }: Props) => import("react/jsx-runtime").JSX.Element;
export default FeaturedModulesHeader;
