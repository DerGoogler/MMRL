import { Component, LegacyRef } from "react";
import { SearchInput, ProgressCircular, Row } from "react-onsenui";
import { Button, Page } from "react-onsenuix";
import axios from "axios";
import ExploreModule from "@Components/ExploreModule";
import SharedPreferences from "@Native/SharedPreferences";
import { PushProps } from "@Activitys/MainActivity";
import { SearchRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import ons from "onsenui";
import { string } from "@Strings";
import { isTablet } from "react-device-detect";
import RepoActivity from "@Activitys/RepoActivity";

interface Props {
  pushPage(...arg: any): PushProps;
}

interface States {
  modulesIndex: Array<any>;
  currentSerachText: string;
  search: string;
  moduleOptions: any[any];
  loading: boolean;
}

class ExploreModuleFragment extends Component<Props, States> {
  private searchBar: LegacyRef<SearchInput> | undefined;
  private prefManager: SharedPreferences;

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      modulesIndex: [],
      currentSerachText: "",
      search: "",
      moduleOptions: {},
      loading: true,
    };
    this.prefManager = new SharedPreferences();
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
      .concat(JSON.parse(SharedPreferences.getString("repos", "[]")))
      .map((repo: any) => {
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
          })
          .then(() => {
            // always executed
          });
      });

    /* axios
      .get(this.prefManager.getString("repo", "https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json"))
      .then((response) => {
        const modules = response.data.modules;
        this.setState({
          modulesIndex: modules,
        });
      })
      .catch((error) => {
        this.setState({
          modulesIndex: [],
        });
      })
      .then(() => {
        // always executed
      });*/

    axios.get("https://dergoogler.com/repo/moduleOptions.json").then((response) => {
      this.setState({
        moduleOptions: response.data,
      });
    });
  };

  public componentDidCatch = () => {};

  private filter = (e: any) => {
    this.setState({ currentSerachText: e.target.value.toLowerCase() });
  };

  private triggerSearch = () => {
    this.setState((state: Readonly<States>, props: Readonly<Props>) => ({
      search: state.currentSerachText,
    }));
  };

  public render = () => {
    const { search, loading, modulesIndex } = this.state;

    const resultsRender = [];

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
          <div
            style={{
              textAlign: "center",
              display: "inline-flex",
              justifyContent: "center",
              padding: "8px 8px 4px",
            }}
          >
            <SearchInput
              placeholder={string.search_modules}
              ref={this.searchBar}
              style={{
                borderRadius: "8px",
                width: "100%",
                marginRight: "4px",
              }}
              onChange={this.filter}
            />
            <Button
              onClick={this.triggerSearch}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                marginLeft: "4px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SearchRounded sx={{ color: "white" }} />
              </div>
            </Button>
          </div>
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
              this.cardRender(modulesIndex)
            )}
          </module-container>
        </div>
      </>
    );
  };

  private cardRender(map: Array<any>) {
    return map
      .sort((a, b) => (a.id > b.id ? 1 : -1))
      .map((item: any) => {
        return (
          <ExploreModule
            key={item.id}
            getId={item.id}
            propsUrl={item.prop_url}
            notesUrl={item.notes_url}
            downloadUrl={item.zip_url}
            pushPage={this.props.pushPage}
            searchState={this.state.search}
            moduleOptions={this.state.moduleOptions}
            last_update={item.last_update}
          />
        );
      });
  }
}

export default ExploreModuleFragment;
