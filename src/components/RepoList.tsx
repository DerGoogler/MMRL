import * as React from 'react';
import {View} from 'react-native';
import {Card, List, Switch} from 'react-native-paper';
import {RepoInterface, useRepos} from '../hooks/useRepos';
import {window} from '../utils/window';

export interface RepoList {
  repo: RepoInterface;
  index: number;
}

export const RepoList: React.FC<RepoList> = props => {
  const {repo, index} = props;
  const {repos, setRepos, forceRender} = useRepos();

  return (
    <React.Fragment>
      {/* <View style={{marginTop: 5, flex: 1}}> */}
      <List.Section>
        <List.Subheader>{repo.name}</List.Subheader>
        <List.Item
          title="Enabled"
          left={props => <List.Icon {...props} icon="puzzle" />}
          right={() => (
            <Switch
              value={repo.enabled}
              onValueChange={state => {
                setRepos(prev => {
                  prev[index].enabled = state;
                  return prev;
                });
                //   props.frr();
                forceRender();
              }}
            />
          )}
        />

        {repo.website && (
          <List.Item
            title="Website"
            left={props => <List.Icon {...props} icon="web" />}
            onPress={() => repo.website && window.open(repo.website)}
          />
        )}
        {repo.support && (
          <List.Item
            title="Support"
            left={props => <List.Icon {...props} icon="support" />}
          />
        )}
        {repo.donate && (
          <List.Item
            title="Donate"
            left={props => <List.Icon {...props} icon="cash" />}
            onPress={() => repo.donate && window.open(repo.donate)}
          />
        )}
        {repo.submitModule && (
          <List.Item
            title="Submit module"
            left={props => <List.Icon {...props} icon="file-upload-outline" />}
            onPress={() => repo.submitModule && window.open(repo.submitModule)}
          />
        )}
        <List.Item
          left={props => <List.Icon {...props} icon="delete" />}
          title="Delete"
        />
      </List.Section>
      {/* </View> */}
    </React.Fragment>
  );
};
