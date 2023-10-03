import React, {FC, useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/navigation';
import HeaderLeftSide from '../../services/navigation/components/HeaderLeftSide';
import Close from '../../assets/icons/Close';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectText'>;

const SelectText: FC<Props> = ({route}) => {
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
    () => <HeaderLeftSide title={'Select Test'} Icon={headerIcon} />,
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
      <Text style={styles.titleDetails}>{route.params.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a20',
    paddingHorizontal: 15,
  },
  titleDetails: {
    color: 'white',
    fontSize: 16,
  },
});

export default SelectText;
