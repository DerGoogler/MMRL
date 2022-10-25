import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import {useReadOnlyRepos} from '../activitys/RepoActivity';
import {ModuleCard, RepoModule} from '../components/ModuleCard';
import {Activity} from '../Manifest';

interface ExploreFragmentProps {
  navigation: Activity<'MainActivity'>['navigation'];
}

const ExploreFragment: React.FC<ExploreFragmentProps> = ({navigation}) => {
  const readonlyRepos = useReadOnlyRepos();

  const [searchQuery, setSearchQuery] = React.useState('');

  const [data, setData] = React.useState<RepoModule[]>([]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  React.useEffect(() => {
    readonlyRepos.forEach(repo => {
      if (repo.isOn) {
        fetch(repo.modules)
          .then(response => response.json())
          .then(data => {
            setData(prev => prev.concat(data.modules));
          });
      }
    });
  }, []);

  if (data.length === 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" animating={true} />
      </View>
    );
  }

  const filteredModules = data.filter(item =>
    item.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ScrollView>
      <View style={{padding: 8}}>
        <Searchbar
          placeholder="Search modules..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{marginBottom: 8}}
        />

        {filteredModules.map((module, index) => (
          <ModuleCard
            navigation={navigation}
            key={index + '_module_' + module.id}
            module={module}
            index={index}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ExploreFragment;
