import React from 'react';
import {useNativeStorage} from './useNativeStorage';

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
  enabled: boolean;
}

const ReposContext = React.createContext({
  repos: [] as RepoInterface[],
  setRepos: (value: React.SetStateAction<RepoInterface[]>) => {},
  reposModulesLink: [] as string[],
});

export const ReposProvider: React.FC<React.PropsWithChildren> = props => {
  const [repos, setRepos] = useNativeStorage<RepoInterface[]>('repos', [
    {
      name: 'Magisk Modules Alternative Repository',
      website: 'https://github.com/Magisk-Modules-Alt-Repo',
      support: undefined,
      donate: undefined,
      submitModule: 'https://github.com/Magisk-Modules-Alt-Repo/submission',
      last_update: undefined,
      modules:
        'https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json',
      enabled: true,
    },
    {
      name: 'Googlers Magisk Repo',
      website: 'https://dergoogler.com/repo',
      support: 'https://github.com/Googlers-Magisk-Repo',
      donate: undefined,
      submitModule: undefined,
      last_update: undefined,
      modules: 'https://dergoogler.com/api/repo/modules',
      enabled: true,
    },
  ]);

  return React.createElement(
    ReposContext.Provider,
    {
      value: {
        repos,
        setRepos,
        reposModulesLink: repos
          .map(repo => repo.enabled && repo.modules)
          .filter(repo => typeof repo == 'string') as string[],
      },
    },
    props.children,
  );
};

export function useRepos() {
  const [, forceRender] = React.useReducer(x => x + 1, 0);
  return {...React.useContext(ReposContext), ...{forceRender}};
}
