import * as React from "react";
import { Card, Page, Toolbar, BackButton } from "react-onsenui";
import pkg from "./../../package.json";

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
    this.setState({ libs: Object.keys(pkg.dependencies) });
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
      // @ts-ignore
      return <Card onClick={() => {
        window.open(`https://www.npmjs.com/package/${item}`)
      }} style={{ marginTop: "4px", marginBottom: "4px" }}>{item}</Card>;
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
