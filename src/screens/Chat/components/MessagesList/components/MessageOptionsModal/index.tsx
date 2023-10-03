import React, {FC, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import CopyText from '../../../../../../assets/icons/CopyText';
import Dislike from '../../../../../../assets/icons/Dislike';
import Document from '../../../../../../assets/icons/Document';
import Like from '../../../../../../assets/icons/Like';
import Repeat from '../../../../../../assets/icons/Repeat';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../../services/navigation';
import regenerateMessageEmitter, {
  EVENTS,
} from '../../../../../../services/events/RegenerateMessageEmitter';
import {Message} from '../../../../../../api/models/chats';

interface MenuPosition {
  x: number;
  y: number;
}

interface OwnProps {
  menuPosition: MenuPosition;
  isVisible?: boolean;
  closeMenu: () => void;
  isAssistant?: boolean;
  message: Message;
}

const MessageOptionsModal: FC<OwnProps> = ({
  menuPosition,
  isVisible,
  closeMenu,
  isAssistant,
  message,
}) => {
  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const modalStyle = useMemo(() => {
    const horizontalPosition =
      menuPosition.x > screenWidth / 2
        ? {right: screenWidth - menuPosition.x}
        : {left: menuPosition.x};

    return {
      ...styles.menuContainer,
      ...horizontalPosition,
      top: menuPosition.y,
    };
  }, [menuPosition, screenWidth]);

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={closeMenu}>
      <TouchableOpacity style={styles.modalContainer} onPress={closeMenu}>
        <View style={modalStyle}>
          <View>
            <TouchableOpacity
              onPress={() => Clipboard.setString(message.content)}>
              <View style={styles.menuOption}>
                <CopyText height={20} width={20} color="white" />
                <Text style={styles.menuOptionText}>Copy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SelectText', {text: message.content})
              }>
              <View style={styles.menuOption}>
                <Document height={20} width={20} color="white" />
                <Text style={styles.menuOptionText}>Select Text</Text>
              </View>
            </TouchableOpacity>

            {isAssistant && (
              <>
                <View style={styles.menuOption}>
                  <Like height={20} width={20} color="white" />
                  <Text style={styles.menuOptionText}>Good Response</Text>
                </View>

                <View style={styles.menuOption}>
                  <Dislike height={20} width={20} color="white" />
                  <Text style={styles.menuOptionText}>Bad Response</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    regenerateMessageEmitter.emit(
                      EVENTS.regenerateMessage,
                      message.id,
                    )
                  }>
                  <View style={styles.menuOption}>
                    <Repeat height={20} width={20} color="white" />
                    <Text style={styles.menuOptionText}>
                      Regenerate Response
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#2d2f39',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 9999,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuOptionText: {
    color: 'white',
    marginLeft: 10,
  },
});

export default MessageOptionsModal;
