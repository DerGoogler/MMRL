// import React from "react";
// import { RepoInterface, useRepos, useRoRepos } from "./useRepos";
// import axios from "axios";
// import Toast from "@Native/Toast";
// import { ModuleProps } from "./useActivity";

// interface FetchedModulesContextInterface {
//   modulesIndex: Array<ModuleProps.RootObject>;
//   moduleOptions: Array<ModuleProps.Options>;
// }

// const FetchedModulesContext = React.createContext<FetchedModulesContextInterface>({ modulesIndex: [], moduleOptions: [] });

// interface Props extends React.PropsWithChildren {
//   deps?: React.DependencyList | undefined;
// }

// export const FetchedModulesProvider = (props: Props) => {
//   const [modulesIndex, setModulesIndex] = React.useState<Array<ModuleProps.RootObject>>([]);
//   const [moduleOptions, setModuleOptions] = React.useState<Array<ModuleProps.Options>>([]);

//   const { readOnlyRepos } = useRoRepos();
//   const { getRepos } = useRepos();

//   React.useEffect(() => {
//     // const moduels = os.getSchemeParam("module");
//     // if (moduels != (null || undefined || "")) {
//     //   ons.notification.toast("Please wait 2 seconds after the loading screen is gone", { timeout: 2000, animation: "fall" });
//     // }

//     readOnlyRepos.concat(getRepos).map((repo: RepoInterface) => {
//       if (repo.isOn) {
//         axios
//           .get(repo.modules)
//           .then((response) => {
//             const modules = response.data.modules;
//             setModulesIndex((state) => state.concat(modules /*.map((item: any) => ({ ...item }))*/));
//           })
//           .catch((error) => {
//             setModulesIndex([]);
//             Toast.makeText(error, Toast.LENGTH_SHORT).show();
//           })
//           .then(() => {
//             // always executed
//           });
//       } // If the repo is disabled, do nothing.
//     });

//     axios.get("https://raw.githubusercontent.com/Googlers-Repo/googlers-repo.github.io/master/moduleOptions.json").then((response) => {
//       setModuleOptions(response.data);
//     });
//   }, props.deps);

//   return <FetchedModulesContext.Provider value={{ modulesIndex, moduleOptions }} children={props.children} />;
// };

// export const useFetchedModules = () => React.useContext(FetchedModulesContext);
