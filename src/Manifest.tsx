import * as React from 'react';
import {Platform, PlatformAndroidStatic, useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainActivity from './activitys/MainActivity';
import {CustomAppBar} from './components/core/CustomAppBar';
import {
  adaptNavigationTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import SettingsActivity from './activitys/SettingsActivity';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {useNativeStorage} from './hooks/useNativeStorage';
import DescriptionActivity from './activitys/DescriptionActivity';
import RepoActivity from './activitys/RepoActivity';
import {ReposProvider} from './hooks/useRepos';
import {InstallerActivity} from './activitys/InstallerActivity';

type RootStackParamList = {
  MainActivity: undefined;
  SettingsActivity: undefined;
  RepoActivity: undefined;
  DescriptionActivity: {
    notes_url: string;
    title: string;
  };
  InstallerActivity: undefined;
};

export type Activity<
  A extends keyof RootStackParamList = 'MainActivity',
  P = unknown,
> = P & NativeStackScreenProps<RootStackParamList, A>;

const Stack = createStackNavigator<RootStackParamList>();

export const Manifest = () => {
  const theme = {
    ...MD3DarkTheme,
    colors: {
      primary: 'rgb(255, 170, 243)',
      onPrimary: 'rgb(91, 0, 91)',
      primaryContainer: 'rgb(129, 1, 129)',
      onPrimaryContainer: 'rgb(255, 215, 245)',
      secondary: 'rgb(218, 191, 210)',
      onSecondary: 'rgb(61, 43, 58)',
      secondaryContainer: 'rgb(85, 65, 81)',
      onSecondaryContainer: 'rgb(247, 218, 239)',
      tertiary: 'rgb(245, 184, 167)',
      onTertiary: 'rgb(76, 38, 27)',
      tertiaryContainer: 'rgb(102, 60, 47)',
      onTertiaryContainer: 'rgb(255, 219, 209)',
      error: 'rgb(255, 180, 171)',
      onError: 'rgb(105, 0, 5)',
      errorContainer: 'rgb(147, 0, 10)',
      onErrorContainer: 'rgb(255, 180, 171)',
      background: 'rgb(30, 26, 29)',
      onBackground: 'rgb(233, 224, 228)',
      surface: 'rgb(30, 26, 29)',
      onSurface: 'rgb(233, 224, 228)',
      surfaceVariant: 'rgb(78, 68, 75)',
      onSurfaceVariant: 'rgb(209, 194, 203)',
      outline: 'rgb(154, 141, 149)',
      outlineVariant: 'rgb(78, 68, 75)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(233, 224, 228)',
      inverseOnSurface: 'rgb(52, 47, 50)',
      inversePrimary: 'rgb(158, 42, 155)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(41, 33, 40)',
        level2: 'rgb(48, 38, 46)',
        level3: 'rgb(55, 42, 53)',
        level4: 'rgb(57, 43, 55)',
        level5: 'rgb(62, 46, 59)',
      },
      surfaceDisabled: 'rgba(233, 224, 228, 0.12)',
      onSurfaceDisabled: 'rgba(233, 224, 228, 0.38)',
      backdrop: 'rgba(55, 46, 52, 0.4)',
    },
  };

  return (
    <SafeAreaProvider>
      <ReposProvider>
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
              {/* <Stack.Screen
                options={{
                  title: 'Installer',
                }}
                name="InstallerActivity"
                component={InstallerActivity}
              /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ReposProvider>
    </SafeAreaProvider>
  );
};
