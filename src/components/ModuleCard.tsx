import * as React from 'react';
import {Linking, View} from 'react-native';
import {Button, Card, Chip, Text} from 'react-native-paper';
import useFetch from '../hooks/useFetch';
import {Activity} from '../Manifest';
import {formatDate} from '../utils/formatDate';
import {readProps} from '../utils/readProps';
import {window} from '../utils/window';

export interface RepoModule {
  id: string;
  last_update: number;
  notes_url: string;
  prop_url: string;
  stars: number;
  zip_url: string;
}

export interface ModuleProps extends Object {
  id: string;
  name: string;
  version: string;
  versionCode: string;
  author: string;
  description: string;
  updateJson?: string;
  support?: string;
  donate?: string;
  minMagisk?: string;
  minApi?: string;
  maxApi?: string;
}

export interface ModuleCardProps {
  module: RepoModule;
  index: number;
  navigation: Activity<'MainActivity'>['navigation'];
}

export const ModuleCard: React.FC<ModuleCardProps> = props => {
  const {zip_url, prop_url, last_update, notes_url} = props.module;
  const {navigation} = props;
  const {data, error} = useFetch(prop_url, 'text');

  if (error) {
    console.error(
      `There was an error while fetching props from ${prop_url}\n ERROR: ${error.message}`,
    );
    return null;
  }

  if (!data) {
    return null;
  }

  const prop = readProps<ModuleProps>(data);

  return (
    <View style={{marginTop: 5, flex: 1}}>
      <Card>
        <Card.Title
          title={prop.name}
          subtitle={`${prop.author} / ${prop.version} (${prop.versionCode})`}
        />
        <Card.Content>
          <Text variant="labelMedium" children={prop.description} />
          <Text
            style={{
              textAlign: 'right',
            }}
            variant="labelSmall">
            Last Update: {formatDate(new Date(Number(last_update)))}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Chip
            onPress={() =>
              navigation.navigate('DescriptionActivity', {
                notes_url: notes_url,
                title: prop.name,
              })
            }>
            Description
          </Chip>

          <Chip icon="camera" onPress={() => window.open(zip_url)}>
            Download
          </Chip>
        </Card.Actions>
      </Card>
    </View>
  );
};
