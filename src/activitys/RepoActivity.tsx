import * as React from 'react';
import {List, Switch} from 'react-native-paper';
import {useNativeStorage} from '../hooks/useNativeStorage';
import {Activity} from '../Manifest';

export interface Repo {
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
}

// Contact @Der_Googler on Telegram to request changes
export const useReadOnlyRepos = (): Repo[] => {
  const [isMMAREnabled, setMMAREnabled] = useNativeStorage(
    'repoMMARenabled',
    true,
  );
  const [isGMREnabled, setGMREnabled] = useNativeStorage(
    'repoGMRenabled',
    true,
  );

  return [
    {
      name: 'Magisk Modules Alternative Repository',
      website: 'https://github.com/Magisk-Modules-Alt-Repo',
      support: undefined,
      donate: undefined,
      submitModule: 'https://github.com/Magisk-Modules-Alt-Repo/submission',
      last_update: undefined,
      modules:
        'https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json',
      readonly: true,
      isOn: isMMAREnabled,
    },
    {
      name: 'Googlers Magisk Repo',
      website: 'https://dergoogler.com/repo',
      support: 'https://github.com/Googlers-Magisk-Repo',
      donate: undefined,
      submitModule: undefined,
      last_update: undefined,
      modules: 'https://dergoogler.com/api/repo/modules',
      readonly: true,
      isOn: isGMREnabled,
    },
  ];
};

const RepoActivity: React.FC<Activity<'RepoActivity'>> = () => {
  const [isMMAREnabled, setMMAREnabled] = useNativeStorage(
    'repoMMARenabled',
    true,
  );
  const [isGMREnabled, setGMREnabled] = useNativeStorage(
    'repoGMRenabled',
    true,
  );

  return (
    <React.Fragment>
      <List.Section>
        <List.Subheader>Repos</List.Subheader>
        <List.Item
          title="Magisk Modules Alternative Repository"
          description="Public repository"
          right={props => (
            <Switch
              value={isMMAREnabled}
              {...props}
              onValueChange={state => setMMAREnabled(state)}
            />
          )}
        />
        <List.Item
          title="Googlers Magisk Repo"
          description="Private repository"
          right={props => (
            <Switch
              value={isGMREnabled}
              {...props}
              onValueChange={state => setGMREnabled(state)}
            />
          )}
        />
      </List.Section>
    </React.Fragment>
  );
};

export default RepoActivity;
