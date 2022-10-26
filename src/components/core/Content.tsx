import React from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

export interface ContentProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

/**
 * This should used as main activity content component, to avoid overhight caused by `AppBar.Header` component
 */
export const Content: React.FC<ContentProps> = props => {
  const dimensions = useSafeAreaFrame();

  return (
    <ScrollView
      style={props.style}
      contentContainerStyle={{minHeight: dimensions.height}}
      children={props.children}
    />
  );
};
