import {NativeModules} from 'react-native';

const {SuperUserModule} = NativeModules;

export const Shell = {
  exec: (command: string): void => {
    SuperUserModule.exec(command);
  },
  result: (command: string): string => {
    return SuperUserModule.result(command);
  },
  isAppGrantedRoot: (): boolean => {
    return SuperUserModule.isAppGrantedRoot();
  },
};
