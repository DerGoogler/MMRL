import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';
import useFetch from '../hooks/useFetch';
import {Activity} from '../Manifest';
import Markdown from 'react-native-markdown-display';
import {window} from '../utils/window';

const DescriptionActivity: React.FC<Activity<'DescriptionActivity'>> = ({
  route,
}) => {
  const style = useMarkdownStlye();
  const {data, error} = useFetch(route.params.notes_url, 'text');

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
    return false;
  };

  return (
    <React.Fragment>
      <ScrollView style={{padding: 8}}>
        {/* @ts-ignore */}
        <Markdown onLinkPress={onLinkPress} style={style}>
          {data}
        </Markdown>
      </ScrollView>
    </React.Fragment>
  );
};

const useMarkdownStlye = (): StyleSheet.NamedStyles<any> => {
  const theme = useTheme();

  return {
    // The main container
    body: {
      fontSize: 14,
    },

    // Headings
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

    // Horizontal Rule
    hr: {
      borderColor: theme.colors.surfaceDisabled,
      height: 1,
    },

    // Emphasis
    strong: {
      fontWeight: 'bold',
    },
    em: {
      fontStyle: 'italic',
    },
    s: {
      textDecorationLine: 'line-through',
    },

    // Blockquotes
    blockquote: {
      backgroundColor: theme.colors.backdrop,
      borderColor: theme.colors.primary,
      borderLeftWidth: 4,
      marginLeft: 5,
      paddingHorizontal: 5,
    },

    // Lists
    bullet_list: {},
    ordered_list: {},
    list_item: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_content: {
      flex: 1,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_content: {
      flex: 1,
    },

    // Code
    code_inline: {
      borderWidth: 0,
      // borderColor: '#CCCCCC',
      backgroundColor: theme.colors.backdrop,
      padding: 10,
      borderRadius: theme.roundness,
      fontFamily: 'monospace',
    },
    code_block: {
      borderWidth: 0,
      // borderColor: '#CCCCCC',
      backgroundColor: theme.colors.backdrop,
      padding: 10,
      borderRadius: theme.roundness,
      fontFamily: 'monospace',
    },
    fence: {
      borderWidth: 0,
      // borderColor: '#CCCCCC',
      backgroundColor: theme.colors.backdrop,
      padding: 10,
      borderRadius: 4,
      fontFamily: 'monospace',
    },

    // Tables
    table: {
      borderWidth: 1,
      borderColor: theme.colors.surfaceDisabled,
      borderRadius: theme.roundness,
      marginTop: 0,
      marginBottom: 16,
    },
    thead: {},
    tbody: {},
    th: {
      flex: 1,
      padding: 5,
    },
    tr: {
      borderBottomWidth: 1,
      borderColor: theme.colors.surfaceDisabled,
      flexDirection: 'row',
    },
    td: {
      flex: 1,
      padding: 5,
    },

    // Links
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    blocklink: {
      flex: 1,
      borderColor: '#000000',
      borderBottomWidth: 1,
    },

    // Images
    image: {
      flex: 1,
      borderRadius: theme.roundness,
    },

    // Text Output
    text: {},
    textgroup: {},
    paragraph: {
      marginTop: 0,
      marginBottom: 16,
      // marginTop: 10,
      // marginBottom: 10,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
    },
    hardbreak: {
      width: '100%',
      height: 1,
    },
    softbreak: {},

    // Believe these are never used but retained for completeness
    pre: {},
    inline: {},
    span: {},
  };
};

export default DescriptionActivity;
