import * as React from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import ExploreFragment from '../fragments/ExploreFragment';
import InstalledFragment from '../fragments/InstalledFragment';
import {Activity} from '../Manifest';

const MainActivity: React.FC<Activity<'MainActivity'>> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Tabs style={{backgroundColor: theme.colors.background}}>
        <TabScreen label="Explore">
          <ExploreFragment navigation={navigation} />
        </TabScreen>

        <TabScreen label="Installed">
          <InstalledFragment />
        </TabScreen>
      </Tabs>
    </React.Fragment>
  );
};

export default MainActivity;
