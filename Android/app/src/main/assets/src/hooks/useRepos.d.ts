import React from "react";
import { SetValue } from "./useNativeStorage";
import { Settings } from "./useSettings";
interface RepoContextInterface {
    repos: StoredRepo[];
    setRepos: SetValue<StoredRepo[]>;
    modules: Module[];
    moduleOptions: any[];
    actions: {
        addRepo: (data: AddRepoData) => void;
        removeRepo: (data: RemoveRepoData) => void;
        setRepoEnabled: (data: SetRepoStateData) => void;
        filterModules: (query: string) => Module[];
    };
}
export declare const RepoContext: React.Context<RepoContextInterface>;
declare type AddRepoData = {
    url: string;
    callback?: (state: StoredRepo[]) => void;
    error?: (error: any) => void;
};
declare type RemoveRepoData = {
    id: string;
    callback?: (state: StoredRepo[]) => void;
};
declare type SetRepoStateData = {
    id: string;
    callback?: (state: Settings.Root) => void;
};
export declare const RepoProvider: (props: React.PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
export declare const useRepos: () => RepoContextInterface;
export {};
