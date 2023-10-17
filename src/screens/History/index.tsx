import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../services/navigation';
import colors from '../../styles/Colors';
import Arrow from '../../assets/icons/arrows/Arrow';
import {getChats} from '../../api/chats';
import formatDate from '../../utils/dates/formatDate';
import groupByDay from '../../utils/dates/groupByDay';
import getChatEmittter, {EVENTS} from '../../services/events/GetChatEmitter';

interface Chat {
  createdAt: string;
  id: string;
  lastUsedAt: string;
  model: string;
  title: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

const History: FC<Props> = ({navigation}) => {
  const [chats, setChats] = useState<Chat[]>();

  const fetchChats = useCallback(async () => {
    try {
      const chatsHistory = await getChats();

      setChats(chatsHistory);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const chatsSeparateByDate = useMemo(() => {
    const newChats = chats?.map(chat => ({
      ...chat,
      lastUsedAt: formatDate(chat.lastUsedAt),
    }));

    let grouped;

    if (newChats?.length) {
      grouped = groupByDay(newChats);
    }

    console.log(grouped);

    return grouped;
  }, [chats]);

  const goTo = useCallback(
    (id: string) => {
      getChatEmittter.emit(EVENTS.getChat, id);

      navigation.navigate('Chat');
    },
    [navigation],
  );

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContatiner}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Arrow height={24} width={24} color="white" direction="left" />
        </TouchableOpacity>

        <TextInput
          style={styles.filterArea}
          placeholder="Search"
          placeholderTextColor={colors.dark.whiteDark}
        />
      </View>

      <ScrollView>
        {chatsSeparateByDate?.map(chatDay => (
          <View style={styles.messagesContainer}>
            <>
              <Text style={styles.time}>{chatDay[0].lastUsedAt}</Text>

              {chatDay.map(chat => (
                <TouchableOpacity
                  style={styles.messagesContent}
                  onPress={() => goTo(chat.id)}>
                  <Text style={styles.title}>{chat.title}</Text>

                  <Text style={styles.subtitle}>Subtitle</Text>
                </TouchableOpacity>
              ))}
            </>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
    padding: 15,
    paddingBottom: 10,
  },
  inputContatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.dark.blackLight,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  filterArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    color: '#fff',
  },
  messagesContainer: {
    marginTop: 25,
  },
  messagesContent: {
    marginTop: 25,
  },
  time: {
    color: colors.dark.active,
    fontSize: 14,
  },
  title: {
    color: colors.dark.white,
    fontSize: 16,
  },
  subtitle: {
    color: colors.dark.darkFont,
    fontSize: 14,
  },
});

export default History;
