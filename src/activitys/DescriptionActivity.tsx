import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';
import useFetch from '../hooks/useFetch';
import {Activity} from '../Manifest';
// import Markdown from 'react-native-markdown-display';
// @ts-ignore
import Markdown from 'react-native-markdown-package';
import {window} from '../utils/window';
import { Content } from '../components/core/Content';

const DescriptionActivity: React.FC<Activity<'DescriptionActivity'>> = ({
  route,
  navigation,
}) => {
  const style = useMarkdownStlye();
  const {data, error} = useFetch(route.params.notes_url, 'text');

  React.useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  });

  if (error) {
    return (
      <View style={{padding: 8}}>
        <Text>There was an error while fetching repo modules</Text>
        <Text>ERROR: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <React.Fragment>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" animating={true} />
        </View>
      </React.Fragment>
    );
  }

  const onLinkPress = (url: string) => {
    window.open(url);
    // return false;
  };

  return (
    <React.Fragment>
      <Content style={{padding: 8,flex: 1}}>
        {/* @ts-ignore */}
        <Markdown onLink={onLinkPress} styles={style}>
          {data}
        </Markdown>
      </Content>
    </React.Fragment>
  );
};

const useMarkdownStlye = () => {
  const theme = useTheme();

  const textColor = theme.dark ? '#ffffff' : '#000000';

  return {
    heading1: {
      flexDirection: 'row',
      fontSize: 32,
      paddingBottom: 4.8,
      borderBottomWidth: 1,
      borderColor: theme.colors.surfaceDisabled,
      marginTop: 24,
      marginBottom: 16,
    },
    heading2: {
      flexDirection: 'row',
      fontSize: 24,
      paddingBottom: 4.8,
      borderBottomWidth: 1,
      borderColor: theme.colors.surfaceDisabled,
      marginTop: 24,
      marginBottom: 16,
    },
    heading3: {
      flexDirection: 'row',
      fontSize: 18,
      marginTop: 24,
      marginBottom: 16,
    },
    heading4: {
      flexDirection: 'row',
      fontSize: 16,
      marginTop: 24,
      marginBottom: 16,
    },
    heading5: {
      flexDirection: 'row',
      fontSize: 13,
      marginTop: 24,
      marginBottom: 16,
    },
    heading6: {
      flexDirection: 'row',
      fontSize: 11,
    },
    hr: {
      borderColor: theme.colors.surfaceDisabled,
      height: 1,
    },
    strong: {
      fontWeight: 'bold',
    },
    em: {
      fontStyle: 'italic',
    },
    s: {
      textDecorationLine: 'line-through',
    },
    text: {
      color: textColor,
    },
    blockQuoteText: {
      color: 'grey',
    },
    blockQuoteSection: {
      flexDirection: 'row',
      backgroundColor: theme.colors.backdrop,
      marginTop: 0,
      marginBottom: 16,
      textBreakStrategy: "simple"
    },
    blockQuoteSectionBar: {
      width: 3,
      height: null,
      backgroundColor: theme.colors.primary,
      marginRight: 15,
    },
    tableHeader: {
      backgroundColor: 'grey',
    },
    inlineCode: {
      
      borderWidth: 0,
      backgroundColor: theme.colors.inverseOnSurface,
      padding: 5,
      borderRadius: theme.roundness,
      fontFamily: 'monospace',
    },
    codeBlock: {
      borderWidth: 0,
      backgroundColor: theme.colors.backdrop,
      padding: 10,
      borderRadius: theme.roundness,
      fontFamily: 'monospace',
    },
    autolink: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    image: {
      // flex: 1,
      borderRadius: theme.roundness,
    },
    paragraph: {
      marginTop: 0,
      marginBottom: 16,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
    },
  };
};

export default DescriptionActivity;
