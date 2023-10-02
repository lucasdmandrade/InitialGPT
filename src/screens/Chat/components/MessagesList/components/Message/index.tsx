import React, {FC, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {Message as MessageModel} from '../../../../../../api/models/chats';
import Logo from '../../../../../../assets/icons/ChatGPT/Logo';
import UserDefaultIcon from '../../../../../../assets/icons/UserDefaultIcon';
import MessageOptionsModal from '../MessageOptionsModal';

interface OwnProps {
  message: MessageModel;
}

const Message: FC<OwnProps> = ({message}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});

  const isAssistant = useMemo(
    () => message.author === 'assistant',
    [message.author],
  );

  const handleMenuPress = (e: GestureResponderEvent) => {
    const {pageX, pageY} = e.nativeEvent;
    setMenuPosition({x: pageX, y: pageY});
    setMenuVisible(true);
  };

  return (
    <View>
      <TouchableOpacity onLongPress={handleMenuPress}>
        <View style={styles.messageContainer} key={`message-${message.id}`}>
          {isAssistant ? (
            <Logo height={25} width={25} />
          ) : (
            <UserDefaultIcon height={25} width={25} />
          )}

          <View style={styles.textContainer}>
            <Text style={styles.messageTitle}>
              {isAssistant ? 'CHATGPT' : message.author.toUpperCase()}
            </Text>
            <Text style={styles.title}>{message.content}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <MessageOptionsModal
        menuPosition={menuPosition}
        isVisible={menuVisible}
        closeMenu={() => setMenuVisible(false)}
        isAssistant={isAssistant}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#2d2f39',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 9999,
  },
  menuContent: {
    flexDirection: 'row',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuOptionText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default Message;
