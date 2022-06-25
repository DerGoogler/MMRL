import ToolbarBuilder from "@Builders/ToolbarBuilder";
import React from "react";
import { Card, Toolbar, BackButton } from "react-onsenui";
import dep from "./../utils/licenses.json";
import AppCompatActivity from "./AppCompatActivity";

interface Props {
  popPage: any;
}

interface States {
  libs: any;
}

class AcknowledgementsActivity extends AppCompatActivity<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      libs: [],
    };
  }

  public componentDidMount = () => {
    super.componentDidMount;
    this.setState({ libs: dep });
  };

  public onCreateToolbar = () => {
    return <ToolbarBuilder title="Acknowledgements" onBackButton={this.props.popPage} />;
  };

  public onCreate = () => {
    const libs = this.state.libs.map((item: any) => {
      return (
        <Card
          onClick={() => {
            window.open(item.repository);
          }}
          style={{ marginTop: "4px", marginBottom: "4px" }}
        >
          <license-card-wrapper>
            <license-card-title className="title">
              <license-card-name>{item.name}</license-card-name>
              <license-card-author>{item.author}</license-card-author>
            </license-card-title>
            <div className="content">
              <license-card-description>{item.description}</license-card-description>
              <hr className="license-card-diver" />
              <license-card-infos>
                <license-card-version>{item.version}</license-card-version>
                <license-card-license>{item.license}</license-card-license>
              </license-card-infos>
            </div>
          </license-card-wrapper>
        </Card>
      );
    });
    return (
      <lib-container
        style={{
          paddingBottom: "4px",
        }}
      >
        {libs}
      </lib-container>
    );
  };
}

export default AcknowledgementsActivity;
