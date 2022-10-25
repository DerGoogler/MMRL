import {Alert, Linking} from 'react-native';
// import InAppBrowser, {
//   InAppBrowserAndroidOptions,
// } from 'react-native-inappbrowser-reborn';

export const window = {
  async sleep(timeout: number) {
    return new Promise(resolve => setTimeout(resolve as any, timeout));
  },
  // async open(url: string, opt?: InAppBrowserAndroidOptions) {
  //   try {
  //     // if (await InAppBrowser.isAvailable()) {
  //       // InAppBrowser.open(url, opt);
  //     // } else Linking.openURL(url);
  //   } catch (error) {
  //     Alert.alert((error as Error).message);
  //   }
  // },
};
