import { Toolbar, BackButton, List } from "react-onsenui";
import ListViewBuilder from "@Builders/ListViewBuilder";
import settings from "@Utils/settings";
import pkg from "@Package";
import AppCompatActivity from "./AppCompatActivity";
import ToolbarBuilder from "@Builders/ToolbarBuilder";

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

  protected onCreateToolbar = () => {
    return <ToolbarBuilder title="Settings" onBackButton={this.props.popPage} />;
  };

  protected onCreate = () => {
    return (
      <>
        <settings-container className="settings-dfjsklgdj">
          <List>
            <ListViewBuilder data={settings} pushPage={this.props.pushPage} />
          </List>
        </settings-container>
      </>
    );
  };
}

export default SettingsActivity;
