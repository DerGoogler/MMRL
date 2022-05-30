import { Card, Page, Toolbar, BackButton } from "react-onsenui";
import LinkManager from "@Native/LinkManager";
import dep from "./../../licenseBuild/licenses.json";
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
    this.setState({ libs: Object.values(dep) });
  };

  protected onCreateToolbar = () => {
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

  protected onCreate = () => {
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
