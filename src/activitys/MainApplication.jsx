import * as React from "react";
import { Button, Page, Toolbar, ToolbarButton, List, SearchInput } from "react-onsenui";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import ons from "onsenui";
import MDIcon from "../components/MDIcon";
import { ref, getSubPath, getUrlParam, validURL } from "./../utils";
import Item from "../components/Item";

class MainApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulesIndex: [],
      status: "success",
      currentSerachText: "",
      search: "",
    };
  }

  componentDidMount = () => {
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
  };

  componentDidCatch = () => {};

  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">Googlers Magisk Repo</div>
        <div className="right">
          <ToolbarButton
            style={{ padding: "0px 10px" }}
            onClick={() => {
              ons.notification.prompt("Custom Repo").then(function (input) {
                if (validURL(input)) {
                  localStorage.setItem("repo", input);
                  ons.notification.alert("Repo changed, please refresh the app");
                } else {
                  ons.notification.alert("Invalid input");
                }
              });
            }}
          >
            <MDIcon icon="extension" isInToolbar={true} theme="white" size="24" />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  filter = (e) => {
    this.setState({ currentSerachText: e.target.value.toLowerCase() });
  };

  triggerSearch = () => {
    const { currentSerachText } = this.state;
    this.setState({ search: currentSerachText });
  };

  render = () => {
    const { search } = this.state
    const modules = this.state.modulesIndex.map((item) => {
      return <Item key={item.id} propsUrl={item.prop_url} notesUrl={item.notes_url} downloadUrl={item.zip_url} pushPage={this.props.pushPage} searchState={search} />;
    });

    return (
      <Page renderToolbar={this.renderToolbar}>
        <BrowserView>
          <h1>So sorry, but we're don't offer desktop support</h1>
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
                padding: "8px",
                paddingBottom: "0px",
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
            <List>{modules}</List>
          </div>
        </MobileView>
      </Page>
    );
  };
}

export default MainApplication;
