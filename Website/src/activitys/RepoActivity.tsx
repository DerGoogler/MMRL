import AppCompatActivity from "./AppCompatActivity";
import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";
import {
  Add,
  DeleteRounded,
  ExtensionRounded,
  LanguageRounded,
  SupportRounded,
  UploadFileRounded,
  VolunteerActivismRounded,
} from "@mui/icons-material";
import { link, util } from "googlers-tools";
import ons from "onsenui";
import Icon from "@Components/Icon";
import { AlertDialog as Dialog, Input, List, ListHeader, ListItem, Switch, ToolbarButton } from "react-onsenui";
import Toast from "@Native/Toast";
import { os } from "@Native/os";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import axios from "axios";
import { string } from "@Strings";
import { Fragment } from "react";
import { Searchbar } from "@Components/Searchbar";
import AlertDialog from "@Builders/AlertDialog";

interface Props {
  pushPage: any;
  popPage: any;
}

interface States {
  repos: Array<any>;
  alertDialogShown: boolean;
  repoName: string;
  repoLink: string;
  searchValue: string;
  finalSearchValue: string;
}

interface ListItemProps {
  part: any;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: () => void;
}

export interface RepoInterface {
  /**
   * An required filed, to disply the repository name
   */
  name: string;
  /**
   * An given website link for the repository
   */
  website?: string | undefined;
  /**
   * Given support link i.g. Telegram, Xda, GitHub or something
   */
  support?: string | undefined;
  donate?: string | undefined;
  submitModule?: string | undefined;
  last_update?: string | number | undefined;
  modules: string;
  /**
   * The setting enabled by default if the repo is built-in
   */
  readonly: boolean;
  isOn: boolean;
  built_in_type?: string;
}

class RepoActivity extends AppCompatActivity<Props, States> {
  private pref: ISharedPreferences;

  private readonly MAX_REPO_LENGTH: number = 5;

  public constructor(props: Props | Readonly<Props>) {
    super(props);

    this.pref = new SharedPreferences();

    this.state = {
      repos: JSON.parse(this.pref.getString("repos", "[]")),
      alertDialogShown: false,
      repoName: "",
      repoLink: "",
      searchValue: "",
      finalSearchValue: "",
    };

    this.addRepo = this.addRepo.bind(this);
    this.removeRepo = this.removeRepo.bind(this);
    this.changeEnabledState = this.changeEnabledState.bind(this);
    this.onCreateToolbar = this.onCreateToolbar.bind(this);

    this.hideAlertDialog = this.hideAlertDialog.bind(this);
    this.showAlertDialog = this.showAlertDialog.bind(this);
    this.handleRepoLinkChange = this.handleRepoLinkChange.bind(this);
    this.handleRepoNameChange = this.handleRepoNameChange.bind(this);
    this.repoSearchFilter = this.repoSearchFilter.bind(this);
    this.triggerRepoSearch = this.triggerRepoSearch.bind(this);
  }

  // Contact @Der_Googler on Telegram to request changes
  public static getReadOnlyRepos(): Array<RepoInterface> {
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
        isOn: SharedPreferences.getBoolean("repoMMARenabled", true),
        built_in_type: "MMAR",
      },
      {
        name: "Googlers Magisk Repo",
        website: "https://github.com/Googlers-Magisk-Repo",
        support: undefined,
        donate: undefined,
        submitModule: undefined,
        last_update: undefined,
        modules: "https://repo.dergoogler.com/modules.json",
        readonly: true,
        isOn: SharedPreferences.getBoolean("repoGMRenabled", true),
        built_in_type: "GMR",
      },
    ];
  }

  public componentDidMount(): void {
    const _: string = "userAcceptNewRepos";
    const userAcceptNewRepos = SharedPreferences.getBoolean(_, false);

    if (!userAcceptNewRepos) {
      const builder = AlertDialog.Builder;
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
      builder.show();
    }
  }

  private getRepos(): Array<RepoInterface> {
    return this.pref.getJSON<Array<RepoInterface>>("repos", []);
  }

  private removeRepo(item: any) {
    let array = this.getRepos();

    var index = array.indexOf(item);
    array.splice(index, 1);

    this.pref.setJSON<Array<RepoInterface>>("repos", array);
    this.setState({ repos: this.getRepos() });
  }

  private changeEnabledState(state: any) {
    let array = this.getRepos();
    var item = array.find((item: RepoInterface) => item.isOn === !state);
    if (item) {
      item.isOn = state;
    }
    this.pref.setJSON<Array<RepoInterface>>("repos", array);
  }

  private addRepo() {
    const { repoName, repoLink } = this.state;

    if (repoName != "") {
      if (link.validURL(repoLink)) {
        axios
          .get(repoLink)
          .then((response) => {
            const data = response.data;
            this.pref.setJSON<Array<RepoInterface>>("repos", [
              ...this.pref.getJSON<Array<RepoInterface>>("repos", []),
              {
                name: repoName,
                website: util.typeCheck(link.validURL(data.website), null),
                support: util.typeCheck(link.validURL(data.support), null),
                donate: util.typeCheck(link.validURL(data.donate), null),
                submitModule: util.typeCheck(link.validURL(data.submitModule), null),
                last_update: util.typeCheck(link.validURL(data.last_update), null),
                modules: repoLink,
                readonly: false,
                isOn: false,
              },
            ]);

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
        <ToolbarButton className="back-button--material__icon" onClick={this.showAlertDialog}>
          <Icon icon={Add} keepLight={true} />
        </ToolbarButton>
      ),
    };
  }

  private showAlertDialog() {
    if (this.getRepos().length === this.MAX_REPO_LENGTH) {
      Toast.makeText("You can't add more than 5 repositories (Read-Only Repos are not counted).", Toast.LENGTH_SHORT).show();
    } else {
      this.setState({ alertDialogShown: true });
    }
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

  private repoSearchFilter(e: any) {
    this.setState((state: Readonly<States>, props: Readonly<Props>) => ({
      searchValue: e.target.value,
    }));
  }

  private triggerRepoSearch() {
    this.setState((state: Readonly<States>, props: Readonly<Props>) => ({
      finalSearchValue: state.searchValue,
    }));
  }

  // Some layout atr inspired from @Fox2Code
  public onCreate(): JSX.Element {
    const MListItem = (props: ListItemProps) => {
      return (
        <>
          {props.part && (
            <ListItem onClick={props.onClick}>
              <div className="left">
                <Icon icon={props.icon} />
              </div>

              <div className="center">{props.text}</div>
            </ListItem>
          )}
        </>
      );
    };

    const roReposOption = (): Array<RepoInterface> => {
      return !SharedPreferences.getBoolean("enableHideReadonlyRepositories_switch", false) ? RepoActivity.getReadOnlyRepos() : [];
    };

    const filteredRepos = roReposOption()
      .concat(this.state.repos)
      .filter((item) => item.name.toLowerCase().includes(this.state.finalSearchValue.toLowerCase()));

    return (
      <>
        <Searchbar placeholder={string.search_modules} onButtonClick={this.triggerRepoSearch} onInputChange={this.repoSearchFilter} />
        <List>
          {filteredRepos.map((repo: RepoInterface, index: number) => (
            <Fragment key={index}>
              <ListHeader>
                {repo.name}
                {repo.readonly ? " (Read-Only)" : ""}
              </ListHeader>
              <ListItem
                // @ts-ignore
                onClick={() => {}}
              >
                <div className="left">
                  <Icon icon={ExtensionRounded} />
                </div>

                <div className="center">Enabled</div>
                <div className="right">
                  <Switch
                    modifier="material3"
                    checked={repo.isOn}
                    onChange={(e: any) => {
                      switch (repo.built_in_type) {
                        case "MMAR":
                          this.pref.setBoolean("repoMMARenabled", e.target.checked);
                          break;
                        case "GMR":
                          this.pref.setBoolean("repoGMRenabled", e.target.checked);
                          break;
                        default:
                          this.changeEnabledState(e.target.checked);
                          break;
                      }
                    }}
                  />
                </div>
              </ListItem>
              <MListItem
                part={repo.website}
                icon={LanguageRounded}
                text={string.website}
                onClick={() => {
                  if (repo.website) {
                    os.open(repo.website);
                  }
                }}
              />
              <MListItem
                part={repo.support}
                icon={SupportRounded}
                text={string.support}
                onClick={() => {
                  if (repo.support) {
                    os.open(repo.support);
                  }
                }}
              />
              <MListItem
                part={repo.donate}
                icon={VolunteerActivismRounded}
                text={string.donate}
                onClick={() => {
                  if (repo.donate) {
                    os.open(repo.donate);
                  }
                }}
              />
              <MListItem
                part={repo.submitModule}
                icon={UploadFileRounded}
                text={string.submit_module}
                onClick={() => {
                  if (repo.submitModule) {
                    os.open(repo.submitModule);
                  }
                }}
              />
              <MListItem
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
                        this.removeRepo(repo);
                      }
                    });
                }}
              />
            </Fragment>
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
