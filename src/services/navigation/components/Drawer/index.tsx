import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {RootStackParamList} from '../..';
import History from '../../../../assets/icons/History';
import Interrogation from '../../../../assets/icons/Interrogation';
import Plus from '../../../../assets/icons/Plus';
import Settings from '../../../../assets/icons/Settings';

const Drawer = props => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <DrawerContentScrollView>
      <View style={styles.conatiner}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <Text style={{color: 'white', fontSize: 22}}>L</Text>
          </View>

          <View>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Nome Completo
            </Text>
            <Text style={{color: 'white'}}>nomeCompleto@email.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.freePlanContainer}>
        <TouchableOpacity style={styles.freePlanContent}>
          <Text style={{fontSize: 16, color: 'white'}}>Free Plan</Text>
        </TouchableOpacity>
      </View>

      <Divider style={{marginHorizontal: 20}} />

      <DrawerItem
        label="New Chat"
        labelStyle={styles.label}
        onPress={() => navigation.navigate('ChatDetails')}
        to={'ChatDetails'}
        icon={() => <Plus height={18} width={18} color="white" />}
      />
      <DrawerItem
        label="History"
        labelStyle={styles.label}
        onPress={() => navigation.navigate('History')}
        to={'History'}
        icon={() => <History height={18} width={18} color="white" />}
      />

      <Divider style={{marginHorizontal: 20}} />

      <DrawerItem
        label="Settings"
        labelStyle={styles.label}
        onPress={() => navigation.navigate('ChatDetails')}
        to={'ChatDetails'}
        icon={() => <Settings height={18} width={18} color="white" />}
      />
      <DrawerItem
        label="Help Center"
        labelStyle={styles.label}
        onPress={() => navigation.navigate('ChatDetails')}
        to={'ChatDetails'}
        icon={() => <Interrogation height={18} width={18} color="white" />}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'blue',
    marginRight: 10,
  },
  freePlanContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 25,
    marginTop: 15,
  },
  freePlanContent: {
    flex: 1,
    backgroundColor: '#2d2f39',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    color: 'white',
    margin: 0,
    marginLeft: -20,
    padding: 0,
    textAlign: 'left',
    fontSize: 16,
  },
  textContainer: {
    flexDirection: 'row',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Drawer;
