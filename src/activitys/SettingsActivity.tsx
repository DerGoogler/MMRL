import * as React from 'react';
import {ScrollView} from 'react-native';
import {List, Switch} from 'react-native-paper';
import {useDarkmode} from '../Manifest';

const SettingsActivity: React.FC = () => {
  const {isDarkmode, setIsDarkmode} = useDarkmode();

  return (
    <React.Fragment>
      <ScrollView>
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark mode"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={props => (
              <Switch
                value={isDarkmode}
                {...props}
                onValueChange={state => setIsDarkmode(state)}
              />
            )}
          />
        </List.Section>
      </ScrollView>
    </React.Fragment>
  );
};

export default SettingsActivity;
