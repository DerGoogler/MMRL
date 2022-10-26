import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {StackHeaderProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDarkmode} from '../../Manifest';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView, StatusBar} from 'react-native';
import {Shell} from '../../native/Shell';

export const CustomAppBar: React.FC<StackHeaderProps> = props => {
  const {top} = useSafeAreaInsets();
  const {isDarkmode} = useDarkmode();

  const backgroundStyle = {
    backgroundColor: isDarkmode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkmode ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <Appbar.Header statusBarHeight={top}>
        {props.back ? (
          <Appbar.BackAction onPress={props.navigation.goBack} />
        ) : null}
        <Appbar.Content title={props.options.title || 'MMRL'} />
        {props.route.name === 'MainActivity' && (
          <Appbar.Action
            icon="camera"
            onPress={() => {
              props.navigation.navigate('SettingsActivity');
            }}
          />
        )}
      </Appbar.Header>
    </SafeAreaView>
  );
};