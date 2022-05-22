import * as React from "react";
import { Button, Page, Toolbar, ToolbarButton, Dialog, SearchInput, ProgressCircular, List, ListItem } from "react-onsenui";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import ons from "onsenui";
import MDIcon from "../components/MDIcon";
import { toast } from "react-toastify";
import tools from "../utils/tools";
import Item from "../components/Item";
import RepoIcon from "../components/icons/RepoIcon";
import IssuesIcon from "../components/icons/IssuesIscon";

class MainApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulesIndex: [],
      dialogShown: false,
      status: "success",
      currentSerachText: "",
      search: "",
      moduleOptions: {},
      loading: true,
    };
    this.clickCard = React.createRef();
  }

  componentDidMount = () => {
    const moduels = tools.getUrlParam("module");
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
      .get(localStorage.getItem("repo"))
      .then((response) => {
        const modules = response.data.modules;
        this.setState({
          modulesIndex: modules,
          status: "success",
        });
      })
      .catch((error) => {
        this.setState({
          modulesIndex: [],
          status: "error",
        });
      })
      .then(() => {
        // always executed
      });

    axios.get(tools.getSubPath("moduleOptions.json")).then((response) => {
      this.setState({
        moduleOptions: response.data,
      });
    });
  };

  componentDidCatch = () => {};

  renderToolbar = () => {
    return (
      <Toolbar>
        <div className="center">Magisk Module Repo Loader</div>
        <div className="right">
          <ToolbarButton style={{ padding: "0px 10px" }} onClick={this.showDialog}>
            <MDIcon icon="more_vert" isInToolbar={true} theme="white" size="24" />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  };

  filter = (e) => {
    this.setState({ currentSerachText: e.target.value.toLowerCase() });
  };

  triggerSearch = () => {
    const { currentSerachText } = this.state;
    this.setState({ search: currentSerachText });
  };

  showDialog = () => {
    this.setState({ dialogShown: true });
  };

  hideDialog = () => {
    this.setState({ dialogShown: false });
  };

  render = () => {
    const { search, loading } = this.state;
    const modules = this.state.modulesIndex.map((item) => {
      return (
        <Item
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
      <Page renderToolbar={this.renderToolbar}>
        <BrowserView>
          <h1>So sorry, but we don't offer desktop support</h1>
        </BrowserView>
        <MobileView>
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
                placeholder={"Search modules"}
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
                <MDIcon icon="search" size="24" ignoreDarkmode={true} />
              </Button>
            </div>
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
                  ></ProgressCircular>
                );
              } else {
                return modules;
              }
            })()}
          </div>{" "}
          <Dialog visible={this.state.dialogShown} cancelable={true} onDialogCancel={this.hideDialog}>
            <List style={{ margin: "20px" }}>
              <ListItem
                onClick={() => {
                  ons.notification.prompt("Custom Repo").then((input) => {
                    this.hideDialog();
                    if (tools.validURL(input)) {
                      localStorage.setItem("repo", input);
                      ons.notification.alert("Repo changed, please refresh the app");
                    } else {
                      ons.notification.alert("Invalid input");
                    }
                  });
                }}
              >
                <div class="left">
                  <RepoIcon size="24" />
                </div>
                <div class="center">Custom repo</div>
              </ListItem>
              <ListItem
                onClick={() => {
                  window.open("https://github.com/DerGoogler/DG-Repo/issues", "_blank");
                  this.hideDialog();
                }}
              >
                <div class="left">
                  <IssuesIcon size="24" />
                </div>
                <div class="center">Issues</div>
              </ListItem>
            </List>
          </Dialog>
        </MobileView>
      </Page>
    );
  };
}

export default MainApplication;
