import React from "react";
import { SetValue } from "./useNativeStorage";
interface RepoContextInterface {
    readOnlyRepos: Array<BuiltInRepo>;
    repos: Array<BuiltInRepo>;
    setRepos: SetValue<Array<BuiltInRepo>>;
    modulesIndex: Array<any>;
    moduleOptions: Array<any>;
}
export declare const RepoContext: React.Context<RepoContextInterface>;
interface Props extends React.PropsWithChildren {
    deps?: React.DependencyList | undefined;
}
export declare const RepoProvider: (props: Props) => import("react/jsx-runtime").JSX.Element;
export declare const useRepos: () => {
    readOnlyRepos: BuiltInRepo[];
    getRepos: BuiltInRepo[];
    setRepos: SetValue<BuiltInRepo[]>;
    addRepo: (repolink: string, callback: () => void, err: (error: any) => void) => void;
    removeRepo: (id: string) => void;
    changeEnabledState: (state: any) => void;
    modulesIndex: any[];
    moduleOptions: any[];
};
export {};
