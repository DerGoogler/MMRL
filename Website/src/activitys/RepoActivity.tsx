import {
  Add,
  DeleteRounded,
  ExtensionRounded,
  LanguageRounded,
  SupportRounded,
  UploadFileRounded,
  VolunteerActivismRounded,
} from "@mui/icons-material";
import ons from "onsenui";
import Icon from "@Components/Icon";
import { AlertDialog as Dialog, Input, List, ListHeader, ListItem, Page, Switch, ToolbarButton } from "react-onsenui";
import Toast from "@Native/Toast";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { Fragment } from "react";
import { Searchbar } from "@Components/Searchbar";
import AlertDialog from "@Builders/AlertDialog";
import { RepoInterface, useRepos } from "@Hooks/useRepos";
import React from "react";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { os } from "@Native/Os";
import { useSettings } from "@Hooks/useSettings";
import { useStrings } from "@Hooks/useStrings";

interface ListItemProps {
  part: any;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: () => void;
}

const RepoActivity = () => {
  const MAX_REPO_LENGTH: number = 5;
  const { context } = useActivity();
  const { settings, setSettings } = useSettings();
  const { strings } = useStrings();

  const { readOnlyRepos } = useRepos();

  const { getRepos, addRepo, removeRepo, changeEnabledState } = useRepos();
  const [alertDialogShown, setAlertDialogShown] = React.useState(false);
  const [repoLink, setRepoLink] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [finalSearchValue, setFinalSearchValue] = React.useState("");

  const [userAcceptNewRepos, setUserAcceptNewRepos] = useNativeStorage("userAcceptNewRepos", false);

  const [enableHideReadonlyRepositories, setEnableHideReadonlyRepositories] = useNativeStorage(
    "enableHideReadonlyRepositories_switch",
    false
  );

  React.useEffect(() => {
    if (!userAcceptNewRepos) {
      const builder = AlertDialog.Builder;
      builder.setTitle("Custom repositories!");
      builder.setMessage(
        <div>
          MMRL introduces new <strong>repositories system</strong> with <em>1.6.0</em>. Now can you load every repo into MMRL (This can slow
          down the app if to much repo at once are enabled)
          <span style={{ fontSize: 10, display: "inline-block" }}>
            Magisk Modules Alternative Repository is an read-only repo and can't be removed.
          </span>
        </div>
      );
      builder.setPositiveButton("Oaky!", () => {
        setUserAcceptNewRepos(true);
      });
      builder.setCancelable(false);
      builder.show();
    }
  }, [userAcceptNewRepos]);

  //   public onCreateToolbar() {
  //     return {
  //       title: "Repos",
  //       onBackButton: this.props.popPage,
  //       addToolbarButtonPosition: "right",
  //       addToolbarButton: (
  //         <ToolbarButton className="back-button--material__icon" onClick={this.showAlertDialog}>
  //           <Icon icon={Add} keepLight={true} />
  //         </ToolbarButton>
  //       ),
  //     };
  //   }

  const showAlertDialog = () => {
    if (getRepos.length === MAX_REPO_LENGTH) {
      Toast.makeText("You can't add more than 5 repositories (Read-Only Repos are not counted).", Toast.LENGTH_SHORT).show();
    } else {
      setAlertDialogShown(true);
    }
  };

  const hideAlertDialog = () => {
    setAlertDialogShown(false);
  };

  const handleRepoLinkChange = (e: any) => {
    setRepoLink(e.target.value);
  };

  const repoSearchFilter = (e: any) => {
    setSearchValue(e.target.value);
  };

  //   const triggerRepoSearch = () => {
  //     setFinalSearchValue((state) => (state.searchValue,
  //     )};
  //   };

  const _addRepo = () => {
    addRepo(
      repoLink,
      () => {
        setRepoLink("");
        hideAlertDialog();
      },
      (err) => {
        setRepoLink("");
        Toast.makeText(err, Toast.LENGTH_SHORT).show();
        hideAlertDialog();
      }
    );
  };

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
    return !enableHideReadonlyRepositories ? readOnlyRepos : [];
  };

  const filteredRepos = roReposOption()
    .concat(getRepos)
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Repos</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={Add} onClick={showAlertDialog} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <>
      <Page renderToolbar={renderToolbar}>
        {/* <Searchbar placeholder={string("search_modules")} onButtonClick={() => {}} onInputChange={repoSearchFilter} /> */}
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
                          setSettings({ mmar_repo_enabled: e.target.checked });
                          break;
                        case "GMR":
                          setSettings({ gmr_repo_enabled: e.target.checked });
                          break;
                        default:
                          changeEnabledState(e.target.checked);
                          break;
                      }
                    }}
                  />
                </div>
              </ListItem>
              <MListItem
                part={repo.website}
                icon={LanguageRounded}
                text={strings.website}
                onClick={() => {
                  if (repo.website) {
                    os.open(repo.website);
                  }
                }}
              />
              <MListItem
                part={repo.support}
                icon={SupportRounded}
                text={strings.support}
                onClick={() => {
                  if (repo.support) {
                    os.open(repo.support);
                  }
                }}
              />
              <MListItem
                part={repo.donate}
                icon={VolunteerActivismRounded}
                text={strings.donate}
                onClick={() => {
                  if (repo.donate) {
                    os.open(repo.donate);
                  }
                }}
              />
              <MListItem
                part={repo.submitModule}
                icon={UploadFileRounded}
                text={strings.submit_module}
                onClick={() => {
                  if (repo.submitModule) {
                    os.open(repo.submitModule);
                  }
                }}
              />
              <MListItem
                part={!repo.readonly}
                icon={DeleteRounded}
                text={strings.remove}
                onClick={() => {
                  ons.notification
                    .confirm(
                      strings.formatString(strings.confirm_repo_delete, {
                        name: repo.name,
                      }) as string
                    )
                    .then((g) => {
                      if (g) {
                        removeRepo(repo.id);
                      }
                    });
                }}
              />
            </Fragment>
          ))}
        </List>
        <>
          <Dialog isOpen={alertDialogShown} isCancelable={false}>
            <div className="alert-dialog-title">{strings.add_repo}</div>
            <div className="alert-dialog-content">
              <p>
                <Input value={repoLink} onChange={handleRepoLinkChange} modifier="underbar" float placeholder="Repo link" />
              </p>
            </div>
            <div className="alert-dialog-footer">
              <button onClick={hideAlertDialog} className="alert-dialog-button">
                {strings.cancel}
              </button>
              <button onClick={_addRepo} className="alert-dialog-button">
                {strings.add}
              </button>
            </div>
          </Dialog>
        </>
      </Page>
    </>
  );
};

export default RepoActivity;
