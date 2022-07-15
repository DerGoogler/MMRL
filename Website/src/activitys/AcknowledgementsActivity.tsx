import Toolbar from "@Builders/ToolbarBuilder";
import { ActivityXRenderData, Card } from "react-onsenuix";
import dep from "./../utils/licenses.json";
import AppCompatActivity from "./AppCompatActivity";
import { Bota64Class, IBota64 } from "bota64";

interface Props {
  popPage: any;
}

interface States {
  libs: any;
}

class AcknowledgementsActivity extends AppCompatActivity<Props, States> {
  private b: IBota64;
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      libs: [],
    };

    this.b = new Bota64Class();
  }

  public componentDidMount = () => {
    super.componentDidMount;
    this.setState({ libs: dep });
  };

  public onCreateToolbar(): Toolbar.Props {
    return {
      title: "Acknowledgements",
      onBackButton: this.props.popPage,
    };
  }

  public onCreate(data: ActivityXRenderData<Props, States>) {
    return (
      <lib-container
        style={{
          paddingBottom: "4px",
        }}
      >
        {data.s.libs.map((item: any) => {
          return (
            <Card
              // @ts-ignore
              onClick={() => {
                window.open(item.repository);
              }}
              style={{ marginTop: "4px", marginBottom: "4px" }}
            >
              <license-card-wrapper>
                <license-card-title className="title">
                  <license-card-name>{this.b.decode(item.name)}</license-card-name>
                  <license-card-author>{this.b.decode(item.author)}</license-card-author>
                </license-card-title>
                <Card.Content>
                  <license-card-description>{this.b.decode(item.description)}</license-card-description>
                  <hr className="license-card-diver" />
                  <license-card-infos>
                    <license-card-version>{this.b.decode(item.version)}</license-card-version>
                    <license-card-license>{this.b.decode(item.license)}</license-card-license>
                  </license-card-infos>
                </Card.Content>
              </license-card-wrapper>
            </Card>
          );
        })}
      </lib-container>
    );
  }
}

export default AcknowledgementsActivity;
