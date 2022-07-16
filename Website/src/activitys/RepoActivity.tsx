import { ActivityXRenderData, List, Toolbar } from "react-onsenuix";
import AppCompatActivity from "./AppCompatActivity";
import { string } from "@Strings";
import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";
import { Add, AddCircle, DeleteRounded, Remove } from "@mui/icons-material";
import { link } from "googlers-tools";
import ons from "onsenui";
import Icon from "@Components/Icon";
import { AlertDialog, Input } from "react-onsenui";
import Toast from "@Native/Toast";
import Constants from "@Native/Constants";

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

  public static getReadOnlyRepos(): Array<any> {
    return [
      {
        name: "Magisk Modules Alternative Repository",
        link: "https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json",
        readonly: true,
      },
    ];
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
        this.pref.setString(
          "repos",
          JSON.stringify([
            ...JSON.parse(this.pref.getString("repos", "[]")),
            {
              name: repoName,
              link: repoLink,
              readonly: false,
            },
          ])
        );
        this.setState({ repos: this.getRepos(), repoName: "", repoLink: "" });
        this.hideAlertDialog();
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

  public onCreate(data: ActivityXRenderData<Props, States>): JSX.Element {
    return (
      <>
        <List>
          {RepoActivity.getReadOnlyRepos()
            .concat(data.s.repos)
            .map((repo: any) => (
              <List.Item>
                {repo.readonly ? (
                  <div className="center">
                    <span className="list-item__title">{repo.name}</span>
                    <span className="list-item__subtitle">Read-Only Repository</span>
                  </div>
                ) : (
                  <div className="center">{repo.name}</div>
                )}

                {!repo.readonly ? (
                  <div className="right">
                    <div
                      onClick={() => {
                        ons.notification.confirm(`Are you sure to remove ${repo.name} repository?`).then((g) => {
                          if (g) {
                            this.removeRepo({
                              name: repo.name,
                              link: repo.link,
                              readonly: false,
                            });
                          }
                        });
                      }}
                    >
                      <Icon icon={DeleteRounded} />
                    </div>
                  </div>
                ) : null}
              </List.Item>
            ))}
        </List>
        <>
          <AlertDialog isOpen={this.state.alertDialogShown} isCancelable={false}>
            <div className="alert-dialog-title">Add repo</div>
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
                Cancel
              </button>
              <button onClick={this.addRepo} className="alert-dialog-button">
                Add
              </button>
            </div>
          </AlertDialog>
        </>
      </>
    );
  }
}

export default RepoActivity;
