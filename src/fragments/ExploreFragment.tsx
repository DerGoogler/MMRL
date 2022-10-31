import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {ActivityIndicator, Button, Searchbar, Text} from 'react-native-paper';
import {ModuleCard} from '../components/ModuleCard';
import {useMapFetch} from '../hooks/useFetch';
import {useRepos} from '../hooks/useRepos';
import {Activity} from '../Manifest';

interface ExploreFragmentProps {
  navigation: Activity<'MainActivity'>['navigation'];
}

const ExploreFragment: React.FC<ExploreFragmentProps> = ({navigation}) => {
  const [, forceRender] = React.useReducer((x) => x + 1, 0);
  const {reposModulesLink} = useRepos();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  if (reposModulesLink.length === 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text>You have no active repositories</Text>
        <Button mode="text" onPress={() => forceRender()}>
          Try refresh your repositories
        </Button>
      </View>
    );
  }

  const {data} = useMapFetch<any>(reposModulesLink);

  if (!data) {
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

  const filteredModules = data.modules.filter((item: any) =>
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

        {filteredModules.map((module: any, index: number) => (
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
