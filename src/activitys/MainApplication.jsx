import * as React from "react";
import { Button, Page, Toolbar, ToolbarButton, Icon, ListItem, List, SearchInput } from "react-onsenui";
import axios from "axios";
import TextEllipsis from "react-text-ellipsis";
import { BrowserView, MobileView } from 'react-device-detect';
import MDIcon from "../components/MDIcon";
import ViewModuleActivity from "./ViewModuleActivity";

class MainApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulesIndex: [],
      status: "success",
      currentSerachText: "",
      search: ""
    }
  }

  getSubPath(url) {
    return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url
  }

  /**
   * @param id
   * @param callback HTMLElement
   *
   * @description
   * Usage
   * ```ts
   * // Id's
   * tools.ref("element", (element: HTMLElement) => { element.style.display = "none" })
   *
   * // Refs
   * tools.ref(this.myRef, (ref: HTMLElement) => { ref.style.display = "none" })
   * ```
   */
   /*public static*/ ref(id/*: string | React.RefObject<any>*/, callback/*: (...props: any) => void*/) {
    if (typeof id == "string") {
      var element/*: HTMLElement | null*/;
      if ((element = document.getElementById(id))) {
        if (typeof callback == "function") {
          callback(element);
        }
      }
    } else {
      var reff/*: React.RefObject<any>*/;
      if ((reff = id)) {
        if (reff && reff.current) {
          if (typeof callback == "function") {
            const ref/*: typeof reff*/ = reff.current;
            callback(ref);
          }
        }
      }
    }
  }

  componentDidMount() {
    axios.get(this.getSubPath("modules.json"))
      .then((response) => {
        this.setState({
          modulesIndex: response.data.modules,
          status: "success"
        })
      })
      .catch((error) => {
        this.setState({
          modulesIndex: [],
          status: "error"
        })
      })
      .then(() => {
        // always executed
      });

    const { search } = this.props;
    this.ref(this.cardName, (ref) => {
      if (search != "") {
        const search = ref.textContent || ref.innerText;
        if (search.toLowerCase().indexOf(search) > -1) {
          this.ref(this.searchedCard, (ref) => {
            ref.style.display = "";
          });
        } else {
          this.ref(this.searchedCard, (ref) => {
            ref.style.display = "none";
          });
        }
      } else {
        this.ref(this.searchedCard, (ref) => {
          ref.style.display = "";
        });
      }
    });
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>Googlers Magisk Repo</div>
        <div className='right'>
          <ToolbarButton>
            <Icon icon='md-menu'></Icon>
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  filter = (e) => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  triggerSearch = () => {
    const { currentSerachText } = this.state;
    this.setState({ search: currentSerachText });
  };

  render() {
    const modules = this.state.modulesIndex.map((item) => (
      <ListItem id={item.id} key={item.id} onClick={() => {
        this.props.pushPage({
          key: `view_${item.id}`,
          page: ViewModuleActivity,
          extra: {
            name: item.details.name,
            download: item.zip_url,
            id: item.id,
            author: item.details.author,
            notes: item.notes_url
          }
        })
      }}>
        <div class="center">
          <TextEllipsis lines={1} tag={'span'} tagClass={'list-item__title'} ellipsisChars={'...'} debounceTimeoutOnResize={200}>
            {item.details.name}
          </TextEllipsis>
          <TextEllipsis lines={3} tag={'span'} tagClass={'list-item__subtitle'} ellipsisChars={'...'} debounceTimeoutOnResize={200}>
            {item.details.description}
          </TextEllipsis>
        </div>
      </ListItem>
    ));

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
            <List>
              {modules}
            </List>
          </div>
        </MobileView>
      </Page>
    );
  }
}

export default MainApplication;
