import { Toolbar, BackButton, List } from "react-onsenui";
import ListViewBuilder from "@Builders/ListViewBuilder";
import settings from "@Utils/settings";
import pkg from "@Package";
import AppCompatActivity from "./AppCompatActivity";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import { string } from "@Strings";

interface Props {
  pushPage: any;
  popPage: any;
}

interface States {
  libs: any;
}

class SettingsActivity extends AppCompatActivity<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      libs: [],
    };
  }

  public componentDidMount = () => {
    super.componentDidMount;
    this.setState({ libs: Object.keys(pkg.dependencies) });
  };

  public onCreateToolbar = () => {
    return <ToolbarBuilder title={string.settings} onBackButton={this.props.popPage} />;
  };

  public onCreate = () => {
    return (
      <>
        <settings-container style={{ height: "100%" }} className="settings-dfjsklgdj">
          <List>
            <ListViewBuilder data={settings} pushPage={this.props.pushPage} />
          </List>
        </settings-container>
      </>
    );
  };
}

export default SettingsActivity;
