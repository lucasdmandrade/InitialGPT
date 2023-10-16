import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Arrow from '../../../../assets/icons/arrows/Arrow';
import Maximize from '../../../../assets/icons/arrows/Maximize';
import colors from '../../../../styles/Colors';
import VoiceTranscriber from '../VoiceTranscriber';

interface MessageHandler {
  setChatMessage: (text: string) => void;
  chatMessage: string | undefined;
}

interface OwnProps {
  isLoading?: boolean;
  messageSetter: any;
  messageHandler: MessageHandler;
  action: () => void;
  showModal: () => void;
}

const Chat: FC<OwnProps> = ({
  isLoading,
  messageSetter,
  messageHandler,
  action,
  showModal,
}) => {
  const inputRef = useRef<TextInput>(null);

  const [inputHeight, setInputHeight] = useState<number>();

  const isButtonDesabled = useMemo(
    () => !messageHandler.chatMessage?.length && !isLoading,
    [isLoading, messageHandler],
  );

  const buttonStyle = useMemo(
    () => ({
      ...styles.arrowUpContainer,
      backgroundColor:
        isButtonDesabled && !isLoading
          ? 'rgba(61, 63, 63, 0.655)'
          : 'rgb(180, 190, 242)',
    }),
    [isButtonDesabled, isLoading],
  );
  const isOpenModalVisible = useMemo(
    () => inputHeight && inputHeight > 70,
    [inputHeight],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.footer}>
      <View style={[styles.inputArea, {height: inputHeight}]}>
        <VoiceTranscriber messageSetter={messageSetter} />

        <TextInput
          multiline={true}
          onContentSizeChange={event => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
          ref={inputRef}
          style={styles.inputText}
          placeholder="Message"
          placeholderTextColor={colors.dark.whiteDark}
          value={messageHandler.chatMessage}
          onChangeText={messageHandler.setChatMessage}
        />
      </View>

      <View style={styles.inputButtonsContainerr}>
        {isOpenModalVisible && (
          <TouchableOpacity onPress={showModal}>
            <Maximize width={22} height={22} color={colors.dark.whiteDark} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={buttonStyle}
          onPress={action}
          disabled={isButtonDesabled}>
          {isLoading ? (
            <View style={styles.square} />
          ) : (
            <Arrow
              width={24}
              height={24}
              color={colors.dark.whiteDark}
              direction="up"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a20',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    paddingBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    color: '#ffffff99',
    fontSize: 16,
    marginLeft: 10,
    paddingRight: 5,
  },
  inputArea: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2d2f39',
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  arrowUpContainer: {
    width: 38,
    height: 38,
    backgroundColor: 'rgb(180, 190, 242)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  square: {
    width: 15,
    height: 15,
    backgroundColor: colors.dark.whiteDark,
  },
  inputButtonsContainerr: {
    alignItems: 'center',
  },
});

export default Chat;
