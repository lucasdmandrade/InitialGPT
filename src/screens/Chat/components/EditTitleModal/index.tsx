import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TextInput as InputRef,
  Text,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {editTitle} from '../../../../api/chats';
import changeTitleEmitter, {
  EVENTS,
} from '../../../../services/events/ChangeTitleModalEmitter';

interface OwnProps {
  title: string;
  chatId?: string;
  setTitle: (newTitle: string) => void;
}

const EditTitleModal: FC<OwnProps> = ({title, chatId, setTitle}) => {
  const [newTitle, setNewTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const showModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const changeTitle = useCallback(() => {
    if (!chatId) {
      return;
    }

    try {
      editTitle(chatId, title);
    } finally {
      setTitle(newTitle);
      setIsVisible(false);
    }
  }, [chatId, newTitle, setTitle, title]);

  useEffect(() => {
    changeTitleEmitter.on(EVENTS.openModal, showModal);

    return () => {
      changeTitleEmitter.off(EVENTS.openModal);
    };
  }, [showModal]);

  return (
    <Modal animationType="slide" visible={isVisible} transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            ref={inputRef}
            mode="outlined"
            textColor="white"
            label="New name"
            style={styles.input}
            outlineColor="rgb(180, 190, 242)"
            activeOutlineColor="rgb(180, 190, 242)"
            onLayout={() => inputRef.current?.focus()}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <View style={styles.footer}>
            <Button onPress={() => setIsVisible(false)}>
              <Text style={styles.btnText}>Cancel</Text>
            </Button>
            <Button onPress={changeTitle}>
              <Text style={styles.btnText}>Rename</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(25, 26, 32,  0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2f39',
    opacity: 1,
    padding: 15,
    width: '100%',
    borderRadius: 25,
  },
  input: {
    backgroundColor: '#2d2f39',
    color: 'white',
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  btnText: {
    color: 'rgb(180, 190, 242)',
  },
});

export default EditTitleModal;
