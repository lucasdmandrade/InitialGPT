import React, {useState, useEffect, FC} from 'react';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Microphone from '../../../../assets/icons/Microphone';
import {OwnProps} from './types';

const VoiceTranscriber: FC<OwnProps> = ({messageSetter}) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    function onSpeechResults(e: SpeechResultsEvent) {
      if (!e.value) {
        return messageSetter('');
      }

      messageSetter(e.value[0]);
    }

    function onSpeechError(e: SpeechErrorEvent) {
      console.error('onSpeechError', e);
    }

    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    Voice.onSpeechRecognized = e => console.log(e);

    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [messageSetter]);

  async function toggleListening() {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        messageSetter('');

        await Voice.start('pt_BR', {
          RECOGNIZER_ENGINE: 'services',
          EXTRA_PARTIAL_RESULTS: true,
        });
        setIsListening(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <TouchableOpacity onPress={toggleListening}>
      <Microphone width={16} height={16} color={'#ffffffcc'} />
    </TouchableOpacity>
  );
};

export default VoiceTranscriber;
