import { Component } from "react";
import { ProgressCircular, Row } from "react-onsenui";
import axios from "axios";
import ExploreModule from "@Components/ExploreModule";
import { PushProps } from "@Activitys/MainActivity";
import { os } from "@Native/os";
import ons from "onsenui";
import { string } from "@Strings";
import { isDesktop, isTablet } from "react-device-detect";
// import RepoActivity, { RepoInterface } from "@Activitys/RepoActivity";
import Toast from "@Native/Toast";
import { Searchbar } from "@Components/Searchbar";
import ModuleProps from "@Types/ModuleProps";
import React from "react";
import { RepoInterface, useRepos, useRoRepos } from "@Hooks/useRepos";

interface Props {
  pushPage(...arg: any): PushProps;
}

interface States {
  modulesIndex: Array<ModuleObject>;
  moduleOptions: any[any];
  loading: boolean;
  searchValue: string;
  finalSearchValue: string;
}

interface ModuleObject {
  id: string;
  last_update: number;
  notes_url: string;
  prop_url: string;
  props: ModuleProps.PropUrl;
  stars: number;
  zip_url: string;
}

const ExploreModuleFragment = (props: Props) => {
  const [modulesIndex, setModulesIndex] = React.useState([]);
  const [moduleOptions, setModuleOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [finalSearchValue, setFinalSearchValue] = React.useState("");

  const { readOnlyRepos } = useRoRepos();
  const { getRepos } = useRepos();

  React.useEffect(() => {
    // const moduels = os.getSchemeParam("module");
    // if (moduels != (null || undefined || "")) {
    //   ons.notification.toast("Please wait 2 seconds after the loading screen is gone", { timeout: 2000, animation: "fall" });
    // }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    readOnlyRepos.concat(getRepos).map((repo: RepoInterface) => {
      if (repo.isOn) {
        axios
          .get(repo.modules)
          .then((response) => {
            const modules = response.data.modules;
            setModulesIndex((state) => state.concat(modules /*.map((item: any) => ({ ...item }))*/));
          })
          .catch((error) => {
            setModulesIndex([]);
            Toast.makeText(error, Toast.LENGTH_SHORT).show();
          })
          .then(() => {
            // always executed
          });
      } // If the repo is disabled, do nothing.
    });

    axios.get("https://raw.githubusercontent.com/Googlers-Repo/googlers-repo.github.io/master/moduleOptions.json").then((response) => {
      setModuleOptions(response.data);
    });
  }, []);

  const filter = (e: any) => {
    setSearchValue(e.target.value);
  };

  const triggerSearch = () => {
    setFinalSearchValue(searchValue);
  };

  const cardRender = (map: Array<ModuleObject>) => {
    const filteredModules = map.filter((item) => item.id.toLowerCase().includes(finalSearchValue.toLowerCase()));

    return filteredModules
      .sort((a, b) => (a.id > b.id ? 1 : -1))
      .map((item) => {
        return (
          <ExploreModule
            fullItem={item}
            getId={item.id}
            propsUrl={item.prop_url}
            props={item.props}
            notesUrl={item.notes_url}
            downloadUrl={item.zip_url}
            pushPage={props.pushPage}
            moduleOptions={moduleOptions}
            last_update={item.last_update}
          />
        );
      });
  };

  const resultsRender: Array<any> = [];

  for (var i = 0; i < modulesIndex.length; i += 2) {
    resultsRender.push(<Row>{cardRender(modulesIndex.slice(i, i + 2))}</Row>);
  }

  return (
    <>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          padding: "0px",
          paddingBottom: "0px",
          flexDirection: "column",
        }}
      >
        <Searchbar placeholder={string.search_modules} onButtonClick={triggerSearch} onInputChange={filter} />
        <module-container
          style={{
            paddingBottom: "4px",
          }}
        >
          {loading ? (
            <ProgressCircular
              indeterminate
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                WebkitTransform: "translate(-50%, -50%)",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : isTablet ? (
            resultsRender
          ) : (
            cardRender(modulesIndex)
          )}
        </module-container>
      </div>
    </>
  );
};

export default ExploreModuleFragment;
