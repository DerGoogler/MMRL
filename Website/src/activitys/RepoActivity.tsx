import { ActivityXRenderData, AlertDialog, List, Toolbar } from "react-onsenuix";
import AppCompatActivity from "./AppCompatActivity";
import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";
import { Add, DeleteRounded, LanguageRounded, SupportRounded, UploadFileRounded, VolunteerActivismRounded } from "@mui/icons-material";
import { link } from "googlers-tools";
import ons from "onsenui";
import Icon from "@Components/Icon";
import { AlertDialog as Dialog, Input } from "react-onsenui";
import Toast from "@Native/Toast";
import { os } from "@Native/os";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import axios from "axios";
import { string } from "@Strings";

interface Props {
  pushPage: any;
  popPage: any;
}

interface States {
  repos: Array<any>;
  alertDialogShown: boolean;
  repoName: string;
  repoLink: string;
}

interface ListItemProps {
  part: any;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: () => void;
}

class RepoActivity extends AppCompatActivity<Props, States> {
  private pref: ISharedPreferences;

  public constructor(props: Props | Readonly<Props>) {
    super(props);

    this.pref = new SharedPreferences();

    this.state = {
      repos: JSON.parse(this.pref.getString("repos", "[]")),
      alertDialogShown: false,
      repoName: "",
      repoLink: "",
    };

    this.addRepo = this.addRepo.bind(this);
    this.removeRepo = this.removeRepo.bind(this);
    this.onCreateToolbar = this.onCreateToolbar.bind(this);

    this.hideAlertDialog = this.hideAlertDialog.bind(this);
    this.showAlertDialog = this.showAlertDialog.bind(this);
    this.handleRepoLinkChange = this.handleRepoLinkChange.bind(this);
    this.handleRepoNameChange = this.handleRepoNameChange.bind(this);
  }

  // Contact @Der_Googler on Telegram to request changes
  public static getReadOnlyRepos(): Array<any> {
    return [
      {
        name: "Magisk Modules Alternative Repository",
        website: "https://github.com/Magisk-Modules-Alt-Repo",
        support: undefined,
        donate: undefined,
        submitModule: "https://github.com/Magisk-Modules-Alt-Repo/submission",
        last_update: undefined,
        modules: "https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json",
        readonly: true,
      },
      {
        name: "Googlers-Magisk-Repo",
        website: "https://github.com/Googlers-Magisk-Repo",
        support: undefined,
        donate: undefined,
        submitModule: undefined,
        last_update: undefined,
        modules: "https://raw.githubusercontent.com/Googlers-Magisk-Repo/googlers-magisk-repo.github.io/master/modules.json",
        readonly: true,
      },
    ];
  }

  public componentDidMount(): void {
    const _: string = "userAcceptNewRepos";
    const userAcceptNewRepos = SharedPreferences.getBoolean(_, false);

    if (!userAcceptNewRepos) {
      const builder = new AlertDialog.Builder();
      builder.setTitle("Custom repositories!");
      builder.setMessage(
        <div>
          MMRL introduces new <strong>repositories system</strong> with <em>1.4.2</em>. Now can you load every repo into MMRL (This can slow
          down the app if to much repo at once are enabled)
          <span style={{ fontSize: 10, display: "inline-block" }}>
            Magisk Modules Alternative Repository is an read-only repo and can't be removed.
          </span>
        </div>
      );
      builder.setPositiveButton("Oaky!", () => {
        SharedPreferences.setBoolean(_, true);
      });
      builder.setCancelable(true);
      builder.showAlert();
    }
  }

  private getRepos(): Array<any> {
    return JSON.parse(this.pref.getString("repos", "[]"));
  }

  private removeRepo(item: any) {
    let array = this.getRepos();

    var index = array.indexOf(item);
    array.splice(index, 1);

    this.pref.setString("repos", JSON.stringify(array));
    this.setState({ repos: this.getRepos() });
  }

  private addRepo() {
    const { repoName, repoLink } = this.state;

    if (repoName != "") {
      if (link.validURL(repoLink)) {
        axios
          .get(repoLink)
          .then((response) => {
            const data = response.data;
            this.pref.setString(
              "repos",
              JSON.stringify([
                ...JSON.parse(this.pref.getString("repos", "[]")),
                {
                  name: repoName,
                  website: data.website ? data.website : null,
                  support: data.support ? data.support : null,
                  donate: data.donate ? data.donate : null,
                  submitModule: data.submitModule ? data.submitModule : null,
                  last_update: data.last_update ? data.last_update : null,
                  modules: repoLink,
                  readonly: false,
                },
              ])
            );

            this.hideAlertDialog();
          })
          .catch((error) => {
            Toast.makeText(error, Toast.LENGTH_SHORT).show();
            this.hideAlertDialog();
          })
          .then(() => {
            this.setState({ repos: this.getRepos(), repoName: "", repoLink: "" });
          });
      } else {
        Toast.makeText("The given link isn't valid.", Toast.LENGTH_SHORT).show();
      }
    } else {
      Toast.makeText("Can't add nameless repo.", Toast.LENGTH_SHORT).show();
    }
  }

  public onCreateToolbar() {
    return {
      title: "Repos",
      onBackButton: this.props.popPage,
      addToolbarButtonPosition: "right",
      addToolbarButton: (
        <Toolbar.Button className="back-button--material__icon" onClick={this.showAlertDialog}>
          <span className="back-button__icon back-button--material__icon">
            <Add />
          </span>
        </Toolbar.Button>
      ),
    };
  }

  private showAlertDialog() {
    this.setState({ alertDialogShown: true });
  }

  private hideAlertDialog() {
    this.setState({ alertDialogShown: false });
  }

  private handleRepoNameChange(e: any) {
    this.setState({ repoName: e.target.value });
  }
  private handleRepoLinkChange(e: any) {
    this.setState({ repoLink: e.target.value });
  }

  // Some layout atr inspired from @Fox2Code
  public onCreate(data: ActivityXRenderData<Props, States>): JSX.Element {
    const ListItem = (props: ListItemProps) => {
      return (
        <>
          {props.part ? (
            <List.Item
              // @ts-ignore
              onClick={props.onClick}
            >
              <div className="left">
                <Icon icon={props.icon} />
              </div>

              <div className="center">{props.text}</div>
            </List.Item>
          ) : null}
        </>
      );
    };

    return (
      <>
        <List>
          {RepoActivity.getReadOnlyRepos()
            .concat(data.s.repos)
            .map((repo: any) => (
              <>
                <List.Header>
                  {repo.name}
                  {repo.readonly ? " (Read-Only)" : ""}
                </List.Header>
                <ListItem
                  part={repo.website}
                  icon={LanguageRounded}
                  text={string.website}
                  onClick={() => {
                    os.open(repo.website);
                  }}
                />
                <ListItem
                  part={repo.support}
                  icon={SupportRounded}
                  text={string.support}
                  onClick={() => {
                    os.open(repo.support);
                  }}
                />
                <ListItem
                  part={repo.donate}
                  icon={VolunteerActivismRounded}
                  text={string.donate}
                  onClick={() => {
                    os.open(repo.donate);
                  }}
                />
                <ListItem
                  part={repo.submitModule}
                  icon={UploadFileRounded}
                  text={string.submit_module}
                  onClick={() => {
                    os.open(repo.submitModule);
                  }}
                />
                <ListItem
                  part={!repo.readonly}
                  icon={DeleteRounded}
                  text={string.remove}
                  onClick={() => {
                    ons.notification
                      .confirm(
                        string.formatString(string.confirm_repo_delete, {
                          name: repo.name,
                        }) as string
                      )
                      .then((g) => {
                        if (g) {
                          this.removeRepo({
                            name: repo.name,
                            modules: repo.link,
                            readonly: false,
                          });
                        }
                      });
                  }}
                />
              </>
            ))}
        </List>
        <>
          <Dialog isOpen={this.state.alertDialogShown} isCancelable={false}>
            <div className="alert-dialog-title">{string.add_repo}</div>
            <div className="alert-dialog-content">
              <p>
                <Input value={this.state.repoName} onChange={this.handleRepoNameChange} modifier="underbar" float placeholder="Repo name" />
              </p>
              <p>
                <Input value={this.state.repoLink} onChange={this.handleRepoLinkChange} modifier="underbar" float placeholder="Repo link" />
              </p>
            </div>
            <div className="alert-dialog-footer">
              <button onClick={this.hideAlertDialog} className="alert-dialog-button">
                {string.cancel}
              </button>
              <button onClick={this.addRepo} className="alert-dialog-button">
                {string.add}
              </button>
            </div>
          </Dialog>
        </>
      </>
    );
  }
}

export default RepoActivity;
