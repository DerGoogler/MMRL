import { Component, LegacyRef } from "react";
import { SearchInput, ProgressCircular, Row } from "react-onsenui";
import axios from "axios";
import ExploreModule from "@Components/ExploreModule";
import SharedPreferences from "@Native/SharedPreferences";
import { PushProps } from "@Activitys/MainActivity";
import { os } from "@Native/os";
import ons from "onsenui";
import { string } from "@Strings";
import { isDesktop, isTablet } from "react-device-detect";
import RepoActivity, { RepoInterface } from "@Activitys/RepoActivity";
import Toast from "@Native/Toast";
import { Searchbar } from "@Components/Searchbar";
import ModuleProps from "@Types/ModuleProps";

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
  prop_url: ModuleProps.PropUrl;
  stars: number;
  zip_url: string;
}

class ExploreModuleFragment extends Component<Props, States> {
  private pref: SharedPreferences;

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      modulesIndex: [],
      moduleOptions: {},
      loading: true,
      searchValue: "",
      finalSearchValue: "",
    };
    this.pref = new SharedPreferences();
  }

  public componentDidMount = () => {
    const moduels = os.getSchemeParam("module");
    if (moduels != (null || undefined || "")) {
      ons.notification.toast("Please wait 2 seconds after the loading screen is gone", { timeout: 2000, animation: "fall" });
    }

    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);

    RepoActivity.getReadOnlyRepos()
      .concat(this.pref.getJSON<Array<RepoInterface>>("repos", []))
      .map((repo: RepoInterface) => {
        if (repo.isOn) {
          axios
            .get(repo.modules)
            .then((response) => {
              const modules = response.data.modules;
              this.setState((state, props) => ({
                modulesIndex: state.modulesIndex.concat(modules),
              }));
            })
            .catch((error) => {
              this.setState({
                modulesIndex: [],
              });
              Toast.makeText(error, Toast.LENGTH_SHORT).show();
            })
            .then(() => {
              // always executed
            });
        } // If the repo is disabled, do nothing.
      });

    axios.get("https://repo.dergoogler.com/moduleOptions.json").then((response) => {
      this.setState({
        moduleOptions: response.data,
      });
    });
  };

  public componentDidCatch = () => {};

  private filter = (e: any) => {
    this.setState((state: Readonly<States>, props: Readonly<Props>) => ({
      searchValue: e.target.value,
    }));
  };

  private triggerSearch = () => {
    this.setState((state: Readonly<States>, props: Readonly<Props>) => ({
      finalSearchValue: state.searchValue,
    }));
  };

  public render = () => {
    const { loading, modulesIndex, searchValue, finalSearchValue } = this.state;

    const resultsRender: Array<any> = [];

    for (var i = 0; i < modulesIndex.length; i += 2) {
      resultsRender.push(<Row>{this.cardRender(modulesIndex.slice(i, i + 2))}</Row>);
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
          <Searchbar placeholder={string.search_modules} onButtonClick={this.triggerSearch} onInputChange={this.filter} />
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
            ) : isTablet || isDesktop ? (
              resultsRender
            ) : (
              this.cardRender(modulesIndex)
            )}
          </module-container>
        </div>
      </>
    );
  };

  private cardRender(map: Array<ModuleObject>) {
    const filteredModules = map.filter((item) => item.id.toLowerCase().includes(this.state.finalSearchValue.toLowerCase()));

    return filteredModules
      .sort((a, b) => (a.id > b.id ? 1 : -1))
      .map((item) => {
        return (
          <ExploreModule
            key={item.id}
            getId={item.id}
            propsUrl={item.prop_url}
            notesUrl={item.notes_url}
            downloadUrl={item.zip_url}
            pushPage={this.props.pushPage}
            moduleOptions={this.state.moduleOptions}
            last_update={item.last_update}
          />
        );
      });
  }
}

export default ExploreModuleFragment;
