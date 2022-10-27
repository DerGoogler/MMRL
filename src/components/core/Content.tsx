import React from 'react';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';
import {MD3Theme, useTheme} from 'react-native-paper';
import {Rect, useSafeAreaFrame} from 'react-native-safe-area-context';

export interface ContentProps {
  style?: StyleProp<ViewStyle>;
  children: (theme: MD3Theme, dimensions: Rect) => React.ReactNode;
}

export const ContentWithTheme: React.FC<ContentProps> = props => {
  const dimensions = useSafeAreaFrame();
  const theme = useTheme();

  return (
    <View style={props.style} children={props.children(theme, dimensions)} />
  );
};
