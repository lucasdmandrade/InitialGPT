import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {format, subDays, subMonths, isSameDay} from 'date-fns';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../services/navigation';
import colors from '../../styles/Colors';
import Arrow from '../../assets/icons/arrows/Arrow';
import {getChats} from '../../api/chats';

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

  const groupByDay = useCallback(
    (array: Chat[]) => {
      if (!chats?.length) {
        return;
      }

      const grouped = [];

      const ordenadoPorLastUsedAt = array
        .slice()
        .sort((a, b) => a.lastUsedAt.localeCompare(b.lastUsedAt));

      let grupoAtual = [ordenadoPorLastUsedAt[0]];
      for (let i = 1; i < ordenadoPorLastUsedAt.length; i++) {
        if (ordenadoPorLastUsedAt[i].lastUsedAt === grupoAtual[0].lastUsedAt) {
          grupoAtual.push(ordenadoPorLastUsedAt[i]);
        } else {
          grouped.push(grupoAtual);
          grupoAtual = [ordenadoPorLastUsedAt[i]];
        }
      }
      grouped.push(grupoAtual);

      return grouped;
    },
    [chats?.length],
  );

  const formatDate = (dateString: string): string => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);

    if (isSameDay(currentDate, targetDate)) {
      return 'Today';
    }

    const oneDayAgo = subDays(currentDate, 1);
    if (isSameDay(oneDayAgo, targetDate)) {
      return 'Yesterday';
    }

    const oneWeekAgo = subDays(currentDate, 7);
    if (targetDate >= oneWeekAgo && targetDate < currentDate) {
      return 'Previous 7 days';
    }

    const oneMonthAgo = subMonths(currentDate, 1);
    if (targetDate >= oneMonthAgo && targetDate < currentDate) {
      return 'Previous 30 days';
    }

    return format(targetDate, 'MMMM');
  };

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

    let teste;

    if (newChats?.length) {
      teste = groupByDay(newChats);
    }

    return teste;
  }, [chats, groupByDay]);

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
          placeholderTextColor="#ffffffcc"
        />
      </View>

      <ScrollView>
        {chatsSeparateByDate?.map(chatDay => (
          <View style={styles.messagesContainer}>
            <>
              <Text style={styles.time}>{chatDay[0].lastUsedAt}</Text>

              {chatDay.map(chat => (
                <View style={styles.messagesContent}>
                  <Text style={styles.title}>{chat.title}</Text>
                  <Text style={styles.subtitle}>Subtitle</Text>
                </View>
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
    color: '#ffffffcc',
    fontSize: 14,
  },
});

export default History;
