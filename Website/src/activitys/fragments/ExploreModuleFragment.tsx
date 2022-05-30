import * as React from "react";
import { Button, Page, SearchInput, ProgressCircular } from "react-onsenui";
import axios from "axios";
import { toast } from "react-toastify";
import tools from "@Utils/tools";
import ExploreModule from "@Components/ExploreModule";
import SharedPreferences from "@Native/SharedPreferences";
import { PushProps } from "@Activitys/MainActivity";
import { SearchRounded } from "@mui/icons-material";
import os from "@Native/os";

interface Props {
  pushPage(...arg: any): PushProps;
}

interface States {
  modulesIndex: any[any];
  currentSerachText: string;
  search: string;
  moduleOptions: any[any];
  loading: boolean;
}

class ExploreModuleFragment extends React.Component<Props, States> {
  private searchBar: React.LegacyRef<SearchInput> | undefined;
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
      toast.info("Please wait 2 seconds after the loading screen is gone", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);

    axios
      // @ts-ignore stfu
      .get(this.prefManager.getPref("repo"))
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
      });

    axios.get("https://repo.dergoogler.com/moduleOptions.json").then((response) => {
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
    const { currentSerachText } = this.state;
    this.setState({ search: currentSerachText });
  };

  public render = () => {
    const { search, loading } = this.state;
    const modules = this.state.modulesIndex.map((item: any) => {
      return (
        <ExploreModule
          key={item.id}
          getId={item.id}
          propsUrl={item.prop_url}
          notesUrl={item.notes_url}
          downloadUrl={item.zip_url}
          pushPage={this.props.pushPage}
          searchState={search}
          moduleOptions={this.state.moduleOptions}
          last_update={item.last_update}
        />
      );
    });

    return (
      <Page>
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
              // @ts-ignore
              placeholder={"Search modules"}
              ref={this.searchBar}
              style={{
                borderRadius: "8px",
                width: "100%",
                marginRight: "4px",
              }}
              onChange={this.filter}
            />
            {/*
              // @ts-ignore */}
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
                <SearchRounded />
              </div>
            </Button>
          </div>
          <module-container
            style={{
              paddingBottom: "4px",
            }}
          >
            {(() => {
              if (loading) {
                return (
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
                );
              } else {
                return modules;
              }
            })()}
          </module-container>
        </div>
      </Page>
    );
  };
}

export default ExploreModuleFragment;
