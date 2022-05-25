import * as React from "react";
import { Card, Page, Toolbar, BackButton, List } from "react-onsenui";
import { ListViewBuilder } from "../builders/ListViewBuilder";
import LinkManager from "../native/LinkManager";
import settings from "../utils/settings";
import pkg from "./../../package.json";

interface Props {
  pushPage: any;
  popPage: any;
}

interface States {
  libs: any;
}

class SettingsActivity extends React.Component<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      libs: [],
    };
  }

  public componentDidMount = () => {
    this.setState({ libs: Object.keys(pkg.dependencies) });
  };

  public renderToolbar = () => {
    return (
      // @ts-ignore
      <Toolbar>
        <div className="left">
          {/**
        // @ts-ignore */}
          <BackButton
            // @ts-ignore
            onClick={() => {
              this.props.popPage();
            }}
          />
        </div>
        <div className="center">Settings</div>
        {/**
        // @ts-ignore */}
      </Toolbar>
    );
  };

  public render = () => {
    const libs = this.state.libs.map((item: any) => {
      return (
        // @ts-ignore
        <Card
          onClick={() => {
            LinkManager.open(`https://www.npmjs.com/package/${item}`);
          }}
          style={{ marginTop: "4px", marginBottom: "4px" }}
        >
          {item}
        </Card>
      );
    });
    return (
      <Page renderToolbar={this.renderToolbar}>
        <settings-container>
          {/**
            // @ts-ignore */}
          <List>
            <ListViewBuilder data={settings} pushPage={this.props.pushPage} />
          </List>
        </settings-container>
      </Page>
    );
  };
}

export default SettingsActivity;
