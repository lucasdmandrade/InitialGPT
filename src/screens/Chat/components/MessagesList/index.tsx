import React, {FC, useCallback, useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Logo from '../../../../assets/icons/SnackPrompt/Logo';
import UserDefaultIcon from '../../../../assets/icons/UserDefaultIcon';
import {OwnProps} from './types';

const MessagesList: FC<OwnProps> = ({messages}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToEnd = useCallback(
    () => scrollViewRef.current?.scrollToEnd({animated: true}),
    [],
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      ref={scrollViewRef}
      onContentSizeChange={scrollToEnd}>
      {messages.map((message, key) => (
        <View style={styles.messageContainer} key={`message-${key}`}>
          {message.author === 'assistant' ? (
            <Logo height={25} width={25} />
          ) : (
            <UserDefaultIcon height={25} width={25} />
          )}

          <View style={styles.textContainer}>
            <Text style={styles.messageTitle}>
              {message.author === 'assistant'
                ? 'SNACK PROMPT'
                : message.author.toUpperCase()}
            </Text>
            <Text style={styles.title}>{message.content}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  messageContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
  },
  textContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  messageTitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default MessagesList;
