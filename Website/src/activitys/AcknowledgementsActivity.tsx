
import { string } from "@Strings";
import { Card } from "react-onsenui";
import dep from "./../utils/licenses.json";
import depNative from "./../utils/native-licenses.json";
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
    this.setState({ libs: dep.concat(depNative) });
  };

  public onCreateToolbar() {
    return {
      title: string.acknowledgements,
      onBackButton: this.props.popPage,
    };
  }

  public onCreate() {
    return (
      <lib-container
        style={{
          paddingBottom: "4px",
        }}
      >
        {this.state.libs.map((item: any) => {
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
        })}
      </lib-container>
    );
  }
}

export default AcknowledgementsActivity;
