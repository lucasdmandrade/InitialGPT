import React, {FC, useCallback, useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import Message from './components/Message';
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
      {messages.map(message => (
        <Message message={message} />
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
