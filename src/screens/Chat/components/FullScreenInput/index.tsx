import React, {FC, useCallback} from 'react';
import {
  GestureResponderEvent,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowUp from '../../../../assets/icons/arrows/Arrow';
import Minimize from '../../../../assets/icons/arrows/Minimize';

interface OwnProps {
  isModalVisible: boolean;
  text: string;
  onChangeText: (text: string) => void;
  onPress: (event: GestureResponderEvent) => void;
  closeInput: () => void;
}

const FullScreenInput: FC<OwnProps> = ({
  isModalVisible,
  text,
  onChangeText,
  closeInput,
  onPress,
}) => {
  const closeModalAndSendMessage = useCallback(
    (e: GestureResponderEvent) => {
      onPress(e);
      closeInput();
    },
    [closeInput, onPress],
  );

  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <TextInput
          multiline
          value={text}
          onChangeText={onChangeText}
          style={styles.input}
        />
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={closeInput}>
            <Minimize color={'white'} height={20} width={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.arrowUpContainer}
            onPress={closeModalAndSendMessage}>
            <ArrowUp width={24} height={24} color={'#191a20'} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#191a20',
    padding: 15,
  },
  input: {
    flex: 1,
    color: 'white',
    textAlign: 'left',
    textAlignVertical: 'top',
    paddingVertical: 0,
    paddingRight: 10,
  },
  arrowUpContainer: {
    width: 38,
    height: 38,
    backgroundColor: 'rgb(180, 190, 242)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  controlsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default FullScreenInput;
