import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {List, Switch} from 'react-native-paper';
import {RepoList} from '../components/RepoList';
import {useNativeStorage} from '../hooks/useNativeStorage';
import {RepoInterface, useRepos} from '../hooks/useRepos';
import {Activity} from '../Manifest';
import {window} from '../utils/window';

const RepoActivity: React.FC<Activity<'RepoActivity'>> = () => {
  const {repos} = useRepos();

  return (
    <ScrollView>
      <View style={{padding: 8}}>
        {repos.map((repo, index) => (
          <RepoList key={index + '_' + repo} repo={repo} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default RepoActivity;
