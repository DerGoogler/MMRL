import * as React from "react";
import { Card, Dialog, List, ListItem } from "react-onsenui";
import Properties from "@js.properties/properties";
import SuFile from "@Builders/SuFile";
import AlertBuilder from "@Builders/AlertBuilder";
import DeleteIcon from "./icons/DeleteIcon";
import Log from "@Builders/Log";
import Toast from "@Builders/Toast";
import Gesture from "./Gesture";

interface Props {
  module: string;
}

interface States {
  dialogShown: boolean;
  props: {
    id?: string;
    name?: string;
    version?: string;
    versionCode?: int;
    author?: string;
    description?: string;
    minApi?: int;
    maxApi?: int;
    minMagisk?: int;
    needRamdisk?: boolean;
    support?: string;
    donate?: string;
    config?: string;
    changeBoot?: boolean;
  };
}

class DeviceModule extends React.Component<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      props: {},
      dialogShown: false,
    };
  }

  public componentDidMount() {
    const module = this.props.module;
    const readProps = new SuFile(`/data/adb/modules/${module}/module.prop`).system.read();
    this.setState({
      props: Properties.parseToProperties(readProps),
    });
  }

  private showDialog = () => {
    this.setState({ dialogShown: true });
  };

  private hideDialog = () => {
    this.setState({ dialogShown: false });
  };

  public render = () => {
    const module = this.props.module;
    const { id, name, version, versionCode, author, description } = this.state.props;
    return (
      <>
        <div>
          <Gesture event="hold" callback={this.showDialog}>
            {/*
        // @ts-ignore */}
            <Card
              id={id}
              key={id}
              //@ts-ignore
              style={{ marginTop: "4px", marginBottom: "4px" }}
            >
              <item-card-wrapper>
                <item-title className="title">
                  <item-module-name>{name}</item-module-name>
                </item-title>
                <div className="content">
                  <item-version-author>
                    {version} / {author}
                  </item-version-author>
                  <item-description>{description}</item-description>
                </div>
              </item-card-wrapper>
            </Card>
          </Gesture>
          {/*
 // @ts-ignore */}
          <Dialog visible={this.state.dialogShown} cancelable={true} onDialogCancel={this.hideDialog}>
            {/*
          // @ts-ignore */}
            <List style={{ margin: "20px" }}>
              <ListItem
                onClick={() => {
                  const file = new SuFile(`/data/adb/modules/${module}`);
                  new AlertBuilder()
                    .setTitle(`Delete ${name}`)
                    .setMessage("Are you sure to delete the module forever?")
                    .setPositiveButton("Yes", () => {
                      if (file.system.exists()) {
                        file.system.deleteRecursive();
                        Toast.makeText("Module deleted", Toast.LENGTH_LONG).show();
                      } else {
                        Toast.makeText(`Failed to delete ${module} module`, Toast.LENGTH_LONG).show();
                      }
                    })
                    .showAlert();
                }}
              >
                <div className="left">
                  <DeleteIcon size="24" />
                </div>
                <div className="center">Delete module</div>
              </ListItem>
            </List>
          </Dialog>
        </div>
      </>
    );
  };
}

export default DeviceModule;
