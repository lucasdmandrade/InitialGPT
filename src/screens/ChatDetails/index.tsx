import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/navigation';
import HeaderLeftSide from '../../services/navigation/components/HeaderLeftSide';
import Close from '../../assets/icons/Close';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Lightning from '../../assets/icons/Lightning';

const ChatDetails = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const headerIcon = useMemo(
    () => (
      <TouchableOpacity onPress={navigation.goBack}>
        <Close height={15} width={15} color="white" />
      </TouchableOpacity>
    ),
    [navigation],
  );

  const headerLeftSife = useCallback(
    () => <HeaderLeftSide title={'Chat Details'} Icon={headerIcon} />,
    [headerIcon],
  );

  navigation.setOptions({
    title: '',
    headerStyle: {backgroundColor: '#191a20'},
    headerShadowVisible: false,
    headerTransparent: false,
    headerTintColor: '#fff',
    headerLeft: headerLeftSife,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Model Info</Text>

      <View style={styles.detailsContainer}>
        <Lightning width={35} height={35} color="rgb(25,195,125)" />

        <View style={styles.textDetailsGroup}>
          <Text style={styles.titleDetails}>Default (GPT-3.5)</Text>
          <Text style={styles.textDetails}>
            Our fastest model, great for most everyday tasks.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a20',
    padding: 15,
  },
  title: {
    color: 'rgb(180, 190, 242)',
    fontSize: 14,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  textDetailsGroup: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  titleDetails: {
    color: 'white',
    fontSize: 16,
  },
  textDetails: {
    color: 'white',
    fontSize: 14,
  },
});

export default ChatDetails;
