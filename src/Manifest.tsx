import * as React from 'react';
import {Platform, PlatformAndroidStatic, useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainActivity from './activitys/MainActivity';
import {CustomAppBar} from './components/core/CustomAppBar';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import SettingsActivity from './activitys/SettingsActivity';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {useNativeStorage} from './hooks/useNativeStorage';
import DescriptionActivity from './activitys/DescriptionActivity';
import RepoActivity from './activitys/RepoActivity';

type RootStackParamList = {
  MainActivity: undefined;
  SettingsActivity: undefined;
  RepoActivity: undefined;
  DescriptionActivity: {
    notes_url: string;
  };
};

export type Activity<
  A extends keyof RootStackParamList = 'MainActivity',
  P = unknown,
> = P & NativeStackScreenProps<RootStackParamList, A>;

const Stack = createStackNavigator<RootStackParamList>();

const DarkmodeContext = React.createContext({
  isDarkmode: true,
  setIsDarkmode: (value: React.SetStateAction<boolean>) => {},
});

export const useDarkmode = () => {
  return React.useContext(DarkmodeContext);
};

export const Manifest = () => {
  const [isDarkmode, setIsDarkmode] = useNativeStorage('darkmode', false);
  const initialTheme = isDarkmode ? MD3DarkTheme : MD3LightTheme;
  const [theme, setTheme] = React.useState(initialTheme);

  React.useEffect(() => {
    if (isDarkmode) {
      setTheme(MD3DarkTheme);
    } else {
      setTheme(MD3LightTheme);
    }
  }, [isDarkmode]);

  return (
    <SafeAreaProvider>
      <DarkmodeContext.Provider value={{isDarkmode, setIsDarkmode}}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme as any}>
            <Stack.Navigator
              screenOptions={{
                // headerShown: false,
                header: props => <CustomAppBar {...props} />,
              }}
              initialRouteName="MainActivity">
              <Stack.Screen
                options={{
                  title: 'MMRL',
                }}
                name="MainActivity"
                component={MainActivity}
              />
              <Stack.Screen
                options={{
                  title: 'Settings',
                }}
                name="SettingsActivity"
                component={SettingsActivity}
              />
              <Stack.Screen
                options={{
                  title: 'Sample name',
                }}
                name="DescriptionActivity"
                component={DescriptionActivity}
              />
              <Stack.Screen
                options={{
                  title: 'Repositories',
                }}
                name="RepoActivity"
                component={RepoActivity}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </DarkmodeContext.Provider>
    </SafeAreaProvider>
  );
};
