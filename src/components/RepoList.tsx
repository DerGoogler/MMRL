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
      <View style={{marginTop: 5, flex: 1}}>
        <Card>
          <Card.Title
            title={repo.name}
            rightStyle={{marginRight: 8, padding: 8}}
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
          <Card.Content>
            {repo.website && (
              <List.Item
                title="Website"
                onPress={() => repo.website && window.open(repo.website)}
              />
            )}
            {repo.support && <List.Item title="Support" />}
            {repo.donate && (
              <List.Item
                title="Donate"
                onPress={() => repo.donate && window.open(repo.donate)}
              />
            )}
            {repo.submitModule && (
              <List.Item
                title="Submit module"
                onPress={() =>
                  repo.submitModule && window.open(repo.submitModule)
                }
              />
            )}
            <List.Item title="Delete" />
          </Card.Content>
        </Card>
      </View>
    </React.Fragment>
  );
};
