import * as React from "react";
import { Button, Page, Toolbar, ToolbarButton, Icon, ListItem, List, ListHeader } from "react-onsenui";
import axios from "axios";
import TextEllipsis from "react-text-ellipsis";
import { BrowserView, MobileView } from 'react-device-detect';

class MainActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulesIndex: [],
      status: "success"
    }
  }

  getSubPath(url) {
    return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url
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

  render() {
    const modules = this.state.modulesIndex.map((item) => (
      <ListItem id={item.id} key={item.id}>
        <div class="center">
          <TextEllipsis lines={1} tag={'span'} tagClass={'list-item__title'} ellipsisChars={'...'} debounceTimeoutOnResize={200}>
            {item.details.name}
          </TextEllipsis>
          <TextEllipsis lines={3} tag={'span'} tagClass={'list-item__subtitle'} ellipsisChars={'...'} debounceTimeoutOnResize={200}>
            {item.details.description}
          </TextEllipsis>

        </div>
        <div class="right">
          <Button onClick={() => {

            window.open(item.zip_url, "_parent")
          }}>Download</Button>
        </div>
      </ListItem>
    ));

    return (
      <Page renderToolbar={this.renderToolbar}>
        <BrowserView>
          <h1>So sorry, but we're don't offer desktop support</h1>
        </BrowserView>
        <MobileView>
          <List>
            <ListHeader>Repo</ListHeader>
            {modules}
          </List>
        </MobileView>
      </Page>
    );
  }
}

export default MainActivity;
