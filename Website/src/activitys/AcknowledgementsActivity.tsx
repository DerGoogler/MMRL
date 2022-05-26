import * as React from "react";
import { Card, Page, Toolbar, BackButton } from "react-onsenui";
import LinkManager from "@Native/LinkManager";
import pkg from "@Package";
import dep from "./../../licenseBuild/licenses.json";

interface Props {
  popPage: any;
}

interface States {
  libs: any;
}

class AcknowledgementsActivity extends React.Component<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      libs: [],
    };
  }

  public componentDidMount = () => {
    this.setState({ libs: Object.values(dep) });
  };

  private renderToolbar = () => {
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
        <div className="center">Acknowledgements</div>
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
            LinkManager.open(item.repository);
          }}
          style={{ marginTop: "4px", marginBottom: "4px" }}
        >
          <license-card-wrapper>
            <license-card-title className="title">
              <license-card-name>{item.name}</license-card-name>
              <license-card-author>{item.publisher}</license-card-author>
            </license-card-title>
            <div className="content">
              <license-card-description>{item.description}</license-card-description>
              <hr className="license-card-diver" />
              <license-card-infos>
                <license-card-version>{item.version}</license-card-version>
                <license-card-license>{item.licenses}</license-card-license>
              </license-card-infos>
            </div>
          </license-card-wrapper>
        </Card>
      );
    });
    return (
      <>
        <Page renderToolbar={this.renderToolbar}>
          <lib-container
            style={{
              paddingBottom: "4px",
            }}
          >
            {libs}
          </lib-container>
        </Page>
      </>
    );
  };
}

export default AcknowledgementsActivity;
